import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell, BrowserWindowConstructorOptions } from "electron";
import * as path from "path";
import * as fs from "fs";
import { Preferences, DEFAULT_PREFERENCES, BreakType, BreakPlan, Language, BackgroundConfig } from "../shared/types";
import { exercisesForBreak } from "../data/exercises";
import { t, TranslationKey } from "../data/i18n";
import { loadPreferences, savePreferences } from "./preferences";
import { Scheduler } from "./scheduler";
import { registerBackgroundIpc, resolveBackgroundPath, pickRandomBackground } from "./backgrounds";

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
    return;
  }
  breakWindow = new BrowserWindow(windowOptionsForOverlay());
  breakWindow.loadFile(path.join(__dirname, "..", "renderer", "break.html"));
  breakWindow.once("ready-to-show", () => {
    breakWindow?.webContents.send("break:start", plan);
    breakWindow?.show();
  });
  breakWindow.on("closed", () => {
    breakWindow = null;
    scheduler?.notifyBreakEnded();
  });
}

function buildBreakPlan(type: BreakType): BreakPlan {
  const duration =
    type === "mini"
      ? preferences.miniBreakDurationSeconds
      : preferences.longBreakDurationSeconds;
  let bgData: { mime: string; base64: string } | null = null;
  if (preferences.background.mode !== "none") {
    let file: string | null = null;
    if (preferences.background.mode === "random") {
      const pool = preferences.background.randomPool || "all";
      file = pickRandomBackground(pool);
    } else {
      file = resolveBackgroundPath(preferences.background.selected, preferences.background.mode);
    }
    if (file) {
      try {
        const buf = fs.readFileSync(file);
        const ext = path.extname(file).slice(1).toLowerCase();
        const mime = ext === "svg" ? "image/svg+xml" : "image/" + ext;
        bgData = { mime, base64: buf.toString("base64") };
      } catch (err) {
        console.error("Failed to read background:", err);
      }
    }
  }
  return {
    type,
    totalDurationSeconds: duration,
    language: preferences.language,
    soundEnabled: preferences.soundEnabled,
    background: bgData ? { ...bgData, blurStrength: preferences.background.blurStrength ?? 3 } : null,
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
  const lang = preferences.language;
  const tt = (k: TranslationKey) => t(lang, k);
  const nextLabel = scheduler?.nextBreakLabel(lang) ?? tt("noBreakScheduled");
  return Menu.buildFromTemplate([
    { label: tt("appTitle"), enabled: false },
    { type: "separator" },
    { label: nextLabel, enabled: false },
    { type: "separator" },
    {
      label: tt("trayTakeMiniNow"),
      click: () => scheduler?.triggerNow("mini"),
    },
    {
      label: tt("trayTakeLongNow"),
      click: () => scheduler?.triggerNow("long"),
    },
    { type: "separator" },
    {
      label: tt("trayPause1Hour"),
      click: () => scheduler?.pauseFor(60 * 60 * 1000),
    },
    {
      label: tt("trayResume"),
      click: () => scheduler?.resume(),
    },
    { type: "separator" },
    {
      label: tt("traySettings"),
      click: () => showSettingsWindow(),
    },
    {
      label: tt("trayAbout"),
      click: () => {
        shell.openExternal("https://github.com/uptodatelabs/eye-care");
      },
    },
    { type: "separator" },
    {
      label: tt("trayQuit"),
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
  ipcMain.handle("app:info", () => {
    return {
      version: app.getVersion(),
      author: "uptodatelabs",
      name: "eye-care",
      homepage: "https://github.com/uptodatelabs/eye-care",
    };
  });
  ipcMain.handle("break:skip", () => {
    if (breakWindow && !breakWindow.isDestroyed()) breakWindow.close();
  });
  ipcMain.handle("break:openSource", (_e, url: string) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  preferences = loadPreferences();
  createTray();
  registerIpc();
  registerBackgroundIpc(
    () => preferences.background,
    (c) => {
      preferences.background = c;
      savePreferences(preferences);
    }
  );
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