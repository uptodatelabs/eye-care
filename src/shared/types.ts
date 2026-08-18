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

export interface BreakPlan {
  type: BreakType;
  totalDurationSeconds: number;
  language: Language;
  exercises: Exercise[];
}

export type Language = "en" | "ko";

export interface Preferences {
  language: Language;
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