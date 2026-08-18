import { contextBridge, ipcRenderer } from "electron";
import { Preferences, BackgroundConfig } from "../shared/types";

contextBridge.exposeInMainWorld("eyeCare", {
  getPreferences: () => ipcRenderer.invoke("prefs:get"),
  updatePreferences: (next: Partial<Preferences>) => ipcRenderer.invoke("prefs:update", next),
  backgrounds: {
    listBuiltin: () => ipcRenderer.invoke("bg:listBuiltin"),
    listUser: () => ipcRenderer.invoke("bg:listUser"),
    addUser: () => ipcRenderer.invoke("bg:addUser"),
    deleteUser: (name: string) => ipcRenderer.invoke("bg:deleteUser", name),
    set: (cfg: BackgroundConfig) => ipcRenderer.invoke("bg:set", cfg),
    get: () => ipcRenderer.invoke("bg:get"),
    loadFile: (name: string, mode: "none" | "builtin" | "user") =>
      ipcRenderer.invoke("bg:loadFile", name, mode),
  },
});