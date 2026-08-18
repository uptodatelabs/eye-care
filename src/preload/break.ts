import { contextBridge, ipcRenderer } from "electron";
import { BreakPlan } from "../shared/types";

contextBridge.exposeInMainWorld("eyeCare", {
  onBreakStart: (cb: (plan: BreakPlan) => void) =>
    ipcRenderer.on("break:start", (_e, plan: BreakPlan) => cb(plan)),
  skipBreak: () => ipcRenderer.invoke("break:skip"),
  openSource: (url: string) => ipcRenderer.invoke("break:openSource", url),
});