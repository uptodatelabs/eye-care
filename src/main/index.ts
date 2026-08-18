import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell, BrowserWindowConstructorOptions } from "electron";
import * as path from "path";
import * as fs from "fs";
import { Preferences, DEFAULT_PREFERENCES, BreakType, BreakPlan } from "../shared/types";
import { exercisesForBreak } from "../data/exercises";
import { loadPreferences, savePreferences } from "./preferences";
import { Scheduler } from "./scheduler";

let tray: Tray | null = null;
let breakWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;
let scheduler: Scheduler | null = null;
let preferences: Preferences = { ...DEFAULT_PREFERENCES };

function windowOptionsForOverlay(): BrowserWindowConstructorOptions {
  return {
    width: 600,
    height: 400,
    fullscreen: true,
    alwaysOnTop: true,
    frame: false,
    movable: false,
    resizable: false,
    skipTaskbar: true,
    show: false,
    backgroundColor: "#0b1020",
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "break.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  };
}

function showBreakWindow(plan: BreakPlan): void {
  if (breakWindow && !breakWindow.isDestroyed()) {
    breakWindow.close();
  }
  breakWindow = new BrowserWindow(windowOptionsForOverlay());
  breakWindow.loadFile(path.join(__dirname, "..", "renderer", "break.html"));
  breakWindow.once("ready-to-show", () => {
    breakWindow?.webContents.send("break:start", plan);
    breakWindow?.show();
  });
  breakWindow.on("closed", () => {
    breakWindow = null;
    scheduler?.resumeAfterBreak();
  });
}

function buildBreakPlan(type: BreakType): BreakPlan {
  const duration =
    type === "mini"
      ? preferences.miniBreakDurationSeconds
      : preferences.longBreakDurationSeconds;
  return {
    type,
    totalDurationSeconds: duration,
    exercises: exercisesForBreak(type, duration),
  };
}

function showSettingsWindow(): void {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.focus();
    return;
  }
  settingsWindow = new BrowserWindow({
    width: 520,
    height: 640,
    title: "eye-care — Settings",
    resizable: false,
    backgroundColor: "#f7f8fa",
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "settings.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  settingsWindow.loadFile(path.join(__dirname, "..", "renderer", "settings.html"));
  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

function buildTrayMenu(): Menu {
  const nextLabel = scheduler?.nextBreakLabel() ?? "No break scheduled";
  return Menu.buildFromTemplate([
    { label: `eye-care`, enabled: false },
    { type: "separator" },
    { label: nextLabel, enabled: false },
    { type: "separator" },
    {
      label: "Take a mini break now",
      click: () => scheduler?.triggerNow("mini"),
    },
    {
      label: "Take a long break now",
      click: () => scheduler?.triggerNow("long"),
    },
    { type: "separator" },
    {
      label: "Pause breaks for 1 hour",
      click: () => scheduler?.pauseFor(60 * 60 * 1000),
    },
    {
      label: "Resume breaks",
      click: () => scheduler?.resume(),
    },
    { type: "separator" },
    {
      label: "Settings...",
      click: () => showSettingsWindow(),
    },
    {
      label: "About eye-care",
      click: () => {
        shell.openExternal("https://github.com/uptodatelabs/eye-care");
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ]);
}

function updateTrayMenu(): void {
  if (tray) tray.setContextMenu(buildTrayMenu());
}

function createTray(): void {
  const iconPath = path.join(__dirname, "..", "..", "build", "tray.png");
  let icon = nativeImage.createEmpty();
  if (fs.existsSync(iconPath)) {
    icon = nativeImage.createFromPath(iconPath);
    if (process.platform === "darwin") {
      icon.setTemplateImage(true);
    }
  }
  tray = new Tray(icon);
  tray.setToolTip("eye-care");
  tray.on("double-click", () => showSettingsWindow());
  updateTrayMenu();
}

function registerIpc(): void {
  ipcMain.handle("prefs:get", () => preferences);
  ipcMain.handle("prefs:update", (_e, next: Partial<Preferences>) => {
    preferences = { ...preferences, ...next };
    savePreferences(preferences);
    scheduler?.applyPreferences(preferences);
    updateTrayMenu();
    return preferences;
  });
  ipcMain.handle("break:skip", () => {
    if (breakWindow && !breakWindow.isDestroyed()) breakWindow.close();
  });
  ipcMain.handle("break:openSource", (_e, url: string) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  preferences = loadPreferences();
  createTray();
  registerIpc();
  scheduler = new Scheduler(preferences, (type) => {
    showBreakWindow(buildBreakPlan(type));
    updateTrayMenu();
  });
  scheduler.start();
  if (preferences.firstRun) {
    showSettingsWindow();
    preferences.firstRun = false;
    savePreferences(preferences);
  }
});

app.on("window-all-closed", () => {
  // Do nothing — keep app running in tray. Prevents default quit behavior.
});

app.on("before-quit", () => {
  scheduler?.stop();
  tray?.destroy();
});