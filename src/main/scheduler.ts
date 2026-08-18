import { Preferences, BreakType } from "../shared/types";

type BreakCallback = (type: BreakType) => void;

export class Scheduler {
  private prefs: Preferences;
  private onBreak: BreakCallback;
  private miniTimer: NodeJS.Timeout | null = null;
  private longTimer: NodeJS.Timeout | null = null;
  private pausedUntil = 0;
  private nextMiniAt = 0;
  private nextLongAt = 0;

  constructor(prefs: Preferences, onBreak: BreakCallback) {
    this.prefs = prefs;
    this.onBreak = onBreak;
  }

  start(): void {
    this.scheduleNext();
  }

  stop(): void {
    if (this.miniTimer) clearTimeout(this.miniTimer);
    if (this.longTimer) clearTimeout(this.longTimer);
    this.miniTimer = null;
    this.longTimer = null;
  }

  applyPreferences(prefs: Preferences): void {
    this.prefs = prefs;
    this.stop();
    this.scheduleNext();
  }

  private scheduleNext(): void {
    const now = Date.now();
    if (this.prefs.miniBreakEnabled) {
      this.nextMiniAt = now + this.prefs.miniBreakIntervalMinutes * 60 * 1000;
      const delay = Math.max(1000, this.nextMiniAt - now);
      this.miniTimer = setTimeout(() => this.fire("mini"), delay);
    }
    if (this.prefs.longBreakEnabled) {
      this.nextLongAt = now + this.prefs.longBreakIntervalMinutes * 60 * 1000;
      const delay = Math.max(1000, this.nextLongAt - now);
      this.longTimer = setTimeout(() => this.fire("long"), delay);
    }
  }

  private fire(type: BreakType): void {
    if (Date.now() < this.pausedUntil) {
      const rescheduleIn = this.pausedUntil - Date.now();
      const t = setTimeout(() => this.fire(type), rescheduleIn);
      if (type === "mini") this.miniTimer = t;
      else this.longTimer = t;
      return;
    }
    this.onBreak(type);
  }

  triggerNow(type: BreakType): void {
    if (type === "mini" && this.miniTimer) clearTimeout(this.miniTimer);
    if (type === "long" && this.longTimer) clearTimeout(this.longTimer);
    this.onBreak(type);
  }

  pauseFor(ms: number): void {
    this.pausedUntil = Date.now() + ms;
  }

  resume(): void {
    this.pausedUntil = 0;
  }

  resumeAfterBreak(): void {
    const now = Date.now();
    if (this.prefs.miniBreakEnabled) {
      this.nextMiniAt = now + this.prefs.miniBreakIntervalMinutes * 60 * 1000;
      if (this.miniTimer) clearTimeout(this.miniTimer);
      this.miniTimer = setTimeout(() => this.fire("mini"), this.nextMiniAt - now);
    }
    if (this.prefs.longBreakEnabled) {
      this.nextLongAt = now + this.prefs.longBreakIntervalMinutes * 60 * 1000;
      if (this.longTimer) clearTimeout(this.longTimer);
      this.longTimer = setTimeout(() => this.fire("long"), this.nextLongAt - now);
    }
  }

  nextBreakLabel(): string {
    const now = Date.now();
    if (now < this.pausedUntil) {
      const mins = Math.ceil((this.pausedUntil - now) / 60000);
      return `Paused — resumes in ~${mins} min`;
    }
    const candidates: { type: string; at: number }[] = [];
    if (this.prefs.miniBreakEnabled && this.nextMiniAt) candidates.push({ type: "Mini", at: this.nextMiniAt });
    if (this.prefs.longBreakEnabled && this.nextLongAt) candidates.push({ type: "Long", at: this.nextLongAt });
    if (candidates.length === 0) return "No break scheduled";
    candidates.sort((a, b) => a.at - b.at);
    const mins = Math.max(0, Math.ceil((candidates[0].at - now) / 60000));
    return `Next: ${candidates[0].type} break in ~${mins} min`;
  }
}