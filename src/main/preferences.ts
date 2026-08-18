import { app, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import { Preferences, DEFAULT_PREFERENCES } from "../shared/types";

function preferencesPath(): string {
  return path.join(app.getPath("userData"), "preferences.json");
}

export function loadPreferences(): Preferences {
  try {
    const file = preferencesPath();
    if (!fs.existsSync(file)) return { ...DEFAULT_PREFERENCES };
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(prefs: Preferences): void {
  try {
    fs.writeFileSync(preferencesPath(), JSON.stringify(prefs, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save preferences:", err);
  }
}

ipcMain.handle("prefs:load", () => loadPreferences());
ipcMain.handle("prefs:save", (_e, prefs: Preferences) => {
  savePreferences(prefs);
  return prefs;
});