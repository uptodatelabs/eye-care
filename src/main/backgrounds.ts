import { app, dialog, ipcMain, BrowserWindow } from "electron";
import * as path from "path";
import * as fs from "fs";
import { BackgroundConfig, BackgroundMode } from "../shared/types";

const BUILTIN_BACKGROUNDS = ["sunny-sky", "forest", "sea", "mountains", "sunset"];

function userBackgroundsDir(): string {
  return path.join(app.getPath("userData"), "backgrounds");
}

function builtinBackgroundsDir(): string {
  return path.join(__dirname, "..", "renderer", "backgrounds");
}

export function ensureUserBackgroundsDir(): void {
  const dir = userBackgroundsDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function listUserBackgrounds(): string[] {
  const dir = userBackgroundsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
    .map((f) => path.parse(f).name);
}

export function listBuiltinBackgrounds(): string[] {
  return BUILTIN_BACKGROUNDS;
}

export function resolveBackgroundPath(name: string, mode: BackgroundMode): string | null {
  if (mode === "builtin") {
    const file = path.join(builtinBackgroundsDir(), name + ".svg");
    return fs.existsSync(file) ? file : null;
  }
  if (mode === "user") {
    const dir = userBackgroundsDir();
    const candidates = fs
      .readdirSync(dir)
      .filter((f) => path.parse(f).name === name && /\.(png|jpe?g|webp|gif|svg)$/i.test(f));
    if (candidates.length > 0) return path.join(dir, candidates[0]);
  }
  return null;
}

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

export function registerBackgroundIpc(getConfig: () => BackgroundConfig, setConfig: (c: BackgroundConfig) => void): void {
  ensureUserBackgroundsDir();

  ipcMain.handle("bg:listBuiltin", () => listBuiltinBackgrounds());
  ipcMain.handle("bg:listUser", () => listUserBackgrounds());

  ipcMain.handle("bg:addUser", async (e) => {
    const parentWindow = BrowserWindow.fromWebContents(e.sender);
    const opts: Electron.OpenDialogOptions = {
      title: "Select background image",
      properties: ["openFile", "multiSelections"],
      filters: [
        { name: "Images", extensions: ["png", "jpg", "jpeg", "webp", "gif", "svg"] },
      ],
    };
    const result = parentWindow
      ? await dialog.showOpenDialog(parentWindow, opts)
      : await dialog.showOpenDialog(opts);
    if (result.canceled || result.filePaths.length === 0) return { added: [] };
    const dir = userBackgroundsDir();
    const added: string[] = [];
    for (const src of result.filePaths) {
      const ext = path.extname(src).toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) continue;
      const base = path.parse(src).name.replace(/[^\w-]/g, "_");
      const dest = path.join(dir, base + ext);
      try {
        fs.copyFileSync(src, dest);
        added.push(base);
      } catch (err) {
        console.error("Failed to copy background:", err);
      }
    }
    if (added.length > 0) {
      const cfg = getConfig();
      const merged = Array.from(new Set([...cfg.userImages, ...added]));
      setConfig({ ...cfg, userImages: merged });
    }
    return { added };
  });

  ipcMain.handle("bg:deleteUser", (_e, name: string) => {
    const dir = userBackgroundsDir();
    const candidates = fs
      .readdirSync(dir)
      .filter((f) => path.parse(f).name === name && /\.(png|jpe?g|webp|gif|svg)$/i.test(f));
    for (const c of candidates) {
      try {
        fs.unlinkSync(path.join(dir, c));
      } catch (err) {
        console.error("Failed to delete background:", err);
      }
    }
    const cfg = getConfig();
    setConfig({ ...cfg, userImages: cfg.userImages.filter((n) => n !== name) });
    return true;
  });

  ipcMain.handle("bg:set", (_e, cfg: BackgroundConfig) => {
    setConfig(cfg);
    return cfg;
  });

  ipcMain.handle("bg:get", () => getConfig());

  ipcMain.handle("bg:loadFile", (_e, name: string, mode: BackgroundMode) => {
    const p = resolveBackgroundPath(name, mode);
    if (!p) return null;
    try {
      const data = fs.readFileSync(p);
      const ext = path.extname(p).slice(1).toLowerCase();
      const mime = ext === "svg" ? "image/svg+xml" : "image/" + ext;
      return { mime, data: data.toString("base64") };
    } catch (err) {
      console.error("Failed to load background file:", err);
      return null;
    }
  });
}