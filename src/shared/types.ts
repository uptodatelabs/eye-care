export type BreakType = "mini" | "long";

export interface ExerciseStep {
  text: string;
  durationSeconds: number;
}

export interface Exercise {
  id: string;
  name: string;
  shortDescription: string;
  steps: ExerciseStep[];
  source: string;
  sourceUrl: string;
  forBreakTypes: BreakType[];
}

export interface BreakBackground {
  mime: string;
  base64: string;
  blurStrength: number;
}

export interface BreakPlan {
  type: BreakType;
  totalDurationSeconds: number;
  language: Language;
  soundEnabled: boolean;
  background: BreakBackground | null;
  exercises: Exercise[];
}

export type Language = "en" | "ko";

export type BackgroundMode = "none" | "builtin" | "user" | "random";

export interface BackgroundConfig {
  mode: BackgroundMode;
  selected: string;
  userImages: string[];
  randomPool: "builtin" | "user" | "all";
  blurStrength: number;
}

export interface Preferences {
  language: Language;
  background: BackgroundConfig;
  miniBreakEnabled: boolean;
  miniBreakIntervalMinutes: number;
  miniBreakDurationSeconds: number;
  longBreakEnabled: boolean;
  longBreakIntervalMinutes: number;
  longBreakDurationSeconds: number;
  soundEnabled: boolean;
  strictMode: boolean;
  firstRun: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  language: "en",
  background: {
    mode: "builtin",
    selected: "sunny-sky",
    userImages: [],
    randomPool: "all",
    blurStrength: 3,
  },
  miniBreakEnabled: true,
  miniBreakIntervalMinutes: 20,
  miniBreakDurationSeconds: 20,
  longBreakEnabled: true,
  longBreakIntervalMinutes: 50,
  longBreakDurationSeconds: 300,
  soundEnabled: true,
  strictMode: false,
  firstRun: true,
};

export type BreakState =
  | { status: "idle" }
  | { status: "working"; type: BreakType; endsAt: number }
  | { status: "break"; type: BreakType; endsAt: number };