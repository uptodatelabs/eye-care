import { contextBridge, ipcRenderer } from "electron";
import { Preferences } from "../shared/types";

contextBridge.exposeInMainWorld("eyeCare", {
  getPreferences: () => ipcRenderer.invoke("prefs:get"),
  updatePreferences: (next: Partial<Preferences>) => ipcRenderer.invoke("prefs:update", next),
});