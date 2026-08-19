import { Preferences, BreakType, Language } from "../shared/types";
import { t, TranslationKey } from "../data/i18n";

type BreakCallback = (type: BreakType) => void;

export class Scheduler {
  private prefs: Preferences;
  private onBreak: BreakCallback;
  private miniTimer: NodeJS.Timeout | null = null;
  private longTimer: NodeJS.Timeout | null = null;
  private pausedUntil = 0;
  private nextMiniAt = 0;
  private nextLongAt = 0;
  private activeType: BreakType | null = null;
  private activeStartedAt = 0;

  constructor(prefs: Preferences, onBreak: BreakCallback) {
    this.prefs = prefs;
    this.onBreak = onBreak;
  }

  start(): void {
    this.resetBothFromNow();
    this.scheduleTimers();
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
    this.resetBothFromNow();
    this.scheduleTimers();
  }

  private durationOf(type: BreakType): number {
    return (
      (type === "mini"
        ? this.prefs.miniBreakDurationSeconds
        : this.prefs.longBreakDurationSeconds) * 1000
    );
  }

  private intervalOf(type: BreakType): number {
    return (
      (type === "mini"
        ? this.prefs.miniBreakIntervalMinutes
        : this.prefs.longBreakIntervalMinutes) *
      60 *
      1000
    );
  }

  private nextAtOf(type: BreakType): number {
    return type === "mini" ? this.nextMiniAt : this.nextLongAt;
  }

  private resetBothFromNow(): void {
    const now = Date.now();
    this.nextMiniAt = this.prefs.miniBreakEnabled ? now + this.intervalOf("mini") : 0;
    this.nextLongAt = this.prefs.longBreakEnabled ? now + this.intervalOf("long") : 0;
  }

  private scheduleTimers(): void {
    this.stop();
    const now = Date.now();
    if (this.prefs.miniBreakEnabled && this.nextMiniAt) {
      this.miniTimer = setTimeout(
        () => this.fire("mini"),
        Math.max(1000, this.nextMiniAt - now)
      );
    }
    if (this.prefs.longBreakEnabled && this.nextLongAt) {
      this.longTimer = setTimeout(
        () => this.fire("long"),
        Math.max(1000, this.nextLongAt - now)
      );
    }
  }

  private fire(type: BreakType): void {
    if (Date.now() < this.pausedUntil) {
      const rescheduleIn = this.pausedUntil - Date.now();
      const timer = setTimeout(() => this.fire(type), rescheduleIn);
      if (type === "mini") this.miniTimer = timer;
      else this.longTimer = timer;
      return;
    }
    if (this.activeType) {
      return;
    }
    this.activeType = type;
    this.activeStartedAt = Date.now();
    this.onBreak(type);
  }

  triggerNow(type: BreakType): void {
    if (this.activeType) {
      return;
    }
    this.stop();
    if (type === "mini") this.nextMiniAt = 0;
    else this.nextLongAt = 0;
    this.fire(type);
    if (!this.activeType) return;
    if (type === "mini") this.nextMiniAt = Date.now() + this.intervalOf("mini");
    else this.nextLongAt = Date.now() + this.intervalOf("long");
    this.scheduleTimers();
  }

  notifyBreakEnded(): void {
    const now = Date.now();
    const endedType = this.activeType;
    this.activeType = null;
    if (!endedType) return;
    if (endedType === "mini") {
      this.nextMiniAt = this.prefs.miniBreakEnabled ? now + this.intervalOf("mini") : 0;
      if (this.prefs.longBreakEnabled && this.nextLongAt <= now) {
        this.nextLongAt = now + this.intervalOf("long");
      }
    } else {
      this.nextLongAt = this.prefs.longBreakEnabled ? now + this.intervalOf("long") : 0;
      if (this.prefs.miniBreakEnabled && this.nextMiniAt <= now) {
        this.nextMiniAt = now + this.intervalOf("mini");
      }
    }
    this.scheduleTimers();
  }

  pauseFor(ms: number): void {
    this.pausedUntil = Date.now() + ms;
  }

  resume(): void {
    this.pausedUntil = 0;
  }

  nextBreakLabel(lang: Language): string {
    const tt = (k: TranslationKey) => t(lang, k);
    const now = Date.now();
    if (now < this.pausedUntil) {
      const mins = Math.ceil((this.pausedUntil - now) / 60000);
      return tt("trayPaused") + mins + " min";
    }
    const candidates: { type: string; at: number }[] = [];
    if (this.prefs.miniBreakEnabled && this.nextMiniAt) candidates.push({ type: tt("breakTitleMini"), at: this.nextMiniAt });
    if (this.prefs.longBreakEnabled && this.nextLongAt) candidates.push({ type: tt("breakTitleLong"), at: this.nextLongAt });
    if (candidates.length === 0) return tt("noBreakScheduled");
    candidates.sort((a, b) => a.at - b.at);
    const mins = Math.max(0, Math.ceil((candidates[0].at - now) / 60000));
    return tt("trayNextBreak") + candidates[0].type + " ~" + mins + " min";
  }
}
