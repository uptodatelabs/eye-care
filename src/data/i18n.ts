import { Language } from "../shared/types";

export type ExerciseTranslations = {
  name: string;
  shortDescription: string;
  steps: string[];
};

export type TranslationKey =
  | "appTitle"
  | "settingsTitle"
  | "settingsHint"
  | "miniBreakSection"
  | "longBreakSection"
  | "generalSection"
  | "enableMiniBreaks"
  | "enableLongBreaks"
  | "intervalMinutes"
  | "durationSeconds"
  | "soundNotifications"
  | "strictMode"
  | "strictModeHint"
  | "languageLabel"
  | "saved"
  | "medicalDisclaimer"
  | "breakTitleMini"
  | "breakSubtitleMini"
  | "breakTitleLong"
  | "breakSubtitleLong"
  | "breakComplete"
  | "breakCompleteSubtitle"
  | "skipBreak"
  | "sourcePrefix"
  | "restEyes"
  | "restEyesInstruction"
  | "trayNextBreak"
  | "trayPaused"
  | "trayTakeMiniNow"
  | "trayTakeLongNow"
  | "trayPause1Hour"
  | "trayResume"
  | "traySettings"
  | "trayAbout"
  | "trayQuit"
  | "noBreakScheduled"
  | "exercise20_20_20"
  | "exerciseConsciousBlink"
  | "exerciseNearFarFocus"
  | "exerciseFigure8"
  | "exercisePalming"
  | "exerciseHorizontalRolls"
  | "guideLook20ft"
  | "guideYou"
  | "guideFarL"
  | "guideFarR"
  | "guideSlowBlink"
  | "guideNear"
  | "guideFar"
  | "guideTrace8"
  | "guideWarmPalms"
  | "guideBreathe"
  | "guideSweepLR"
  | "guideL"
  | "guideR"
  | "guideRestEyes"
  | "step20_20_20"
  | "stepBlinkClose"
  | "stepBlinkOpen"
  | "stepNearFocus"
  | "stepFarFocus"
  | "stepNearBack"
  | "stepFarBack"
  | "stepFigure8Imagine"
  | "stepFigure8Trace"
  | "stepFigure8Reverse"
  | "stepPalmRub"
  | "stepPalmCover"
  | "stepPalmBreathe"
  | "stepHoriRight"
  | "stepHoriLeft"
  | "stepHoriCenter"
  | "stepHoriRepeat";

type Dict = Record<TranslationKey, string>;

const en: Dict = {
  appTitle: "eye-care",
  settingsTitle: "eye-care Settings",
  settingsHint: "Adjust break intervals and durations. Changes are saved automatically.",
  miniBreakSection: "Mini break",
  longBreakSection: "Long break",
  generalSection: "General",
  enableMiniBreaks: "Enable mini breaks",
  enableLongBreaks: "Enable long breaks",
  intervalMinutes: "Interval (minutes)",
  durationSeconds: "Duration (seconds)",
  soundNotifications: "Sound notifications",
  strictMode: "Strict mode (no skip)",
  strictModeHint: "",
  languageLabel: "Language",
  saved: "Saved",
  medicalDisclaimer:
    "eye-care is for eye-fatigue relief only. It is not a medical device and does not diagnose, treat, or cure any condition. If you experience persistent eye discomfort, consult a licensed ophthalmologist.",
  breakTitleMini: "Mini eye break",
  breakSubtitleMini: "A quick reset for your eyes.",
  breakTitleLong: "Long eye break",
  breakSubtitleLong: "Follow the guided exercises.",
  breakComplete: "Break complete",
  breakCompleteSubtitle: "Great job. Back to work!",
  skipBreak: "Skip break",
  sourcePrefix: "Source: ",
  restEyes: "Rest your eyes",
  restEyesInstruction: "Look away from the screen and relax.",
  trayNextBreak: "Next: ",
  trayPaused: "Paused — resumes in ~",
  trayTakeMiniNow: "Take a mini break now",
  trayTakeLongNow: "Take a long break now",
  trayPause1Hour: "Pause breaks for 1 hour",
  trayResume: "Resume breaks",
  traySettings: "Settings...",
  trayAbout: "About eye-care",
  trayQuit: "Quit",
  noBreakScheduled: "No break scheduled",
  exercise20_20_20: "20-20-20 Rule",
  exerciseConsciousBlink: "Conscious Blinking",
  exerciseNearFarFocus: "Near-Far Focus Shift",
  exerciseFigure8: "Figure-8 Tracing",
  exercisePalming: "Palming",
  exerciseHorizontalRolls: "Horizontal Eye Rolls",
  guideLook20ft: "Look 20 ft (6 m) away",
  guideYou: "you",
  guideFarL: "far L",
  guideFarR: "far R",
  guideSlowBlink: "Slow blink",
  guideNear: "Near",
  guideFar: "Far",
  guideTrace8: "Trace the 8 with your eyes",
  guideWarmPalms: "Warm palms over closed eyes",
  guideBreathe: "breathe",
  guideSweepLR: "Sweep your gaze left to right",
  guideL: "L",
  guideR: "R",
  guideRestEyes: "Rest your eyes",
  step20_20_20: "Look at an object at least 20 feet (6 m) away — out a window or across the room.",
  stepBlinkClose: "Close your eyes gently and softly for 2 seconds.",
  stepBlinkOpen: "Open slowly. Repeat the slow blink at a relaxed pace.",
  stepNearFocus: "Hold your finger 10-15 inches (25-38 cm) from your eyes and focus on it.",
  stepFarFocus: "Shift focus to an object 20 feet (6 m) or farther away.",
  stepNearBack: "Back to your finger.",
  stepFarBack: "Back to the distant object. Repeat smoothly.",
  stepFigure8Imagine: "Imagine a large figure-8 on the wall about 10 feet (3 m) away.",
  stepFigure8Trace: "Slowly trace it one way with your eyes only (head still).",
  stepFigure8Reverse: "Reverse direction and trace it back.",
  stepPalmRub: "Rub your palms together until they feel warm.",
  stepPalmCover: "Close your eyes and cup your palms over them without pressing on the eyeballs.",
  stepPalmBreathe: "Breathe slowly and relax. Keep the position.",
  stepHoriRight: "Look as far right as comfortable (head still).",
  stepHoriLeft: "Slowly move your gaze to the far left.",
  stepHoriCenter: "Back to center.",
  stepHoriRepeat: "Repeat the slow sweep a few more times.",
};

const ko: Dict = {
  appTitle: "eye-care",
  settingsTitle: "eye-care 설정",
  settingsHint: "휴식 간격과 시간을 조정하세요. 변경사항은 자동 저장됩니다.",
  miniBreakSection: "미니 휴식",
  longBreakSection: "긴 휴식",
  generalSection: "일반",
  enableMiniBreaks: "미니 휴식 사용",
  enableLongBreaks: "긴 휴식 사용",
  intervalMinutes: "간격 (분)",
  durationSeconds: "시간 (초)",
  soundNotifications: "소리 알림",
  strictMode: "엄격 모드 (건너뛰기 금지)",
  strictModeHint: "",
  languageLabel: "언어",
  saved: "저장됨",
  medicalDisclaimer:
    "eye-care는 눈 피로 완화 목적입니다. 의료기기가 아니며 질환을 진단·치료·완치하지 않습니다. 지속적인 눈 불편함이 있다면 안과 전문의와 상담하세요.",
  breakTitleMini: "미니 눈 휴식",
  breakSubtitleMini: "눈에 빠른 휴식을 주세요.",
  breakTitleLong: "긴 눈 휴식",
  breakSubtitleLong: "가이드를 따라 운동해주세요.",
  breakComplete: "휴식 완료",
  breakCompleteSubtitle: "잘했어요. 다시 일어볼까요!",
  skipBreak: "휴식 건너뛰기",
  sourcePrefix: "출처: ",
  restEyes: "눈 휴식",
  restEyesInstruction: "화면에서 눈을 떼고 편안히 쉬세요.",
  trayNextBreak: "다음: ",
  trayPaused: "일시정지 — 약 ",
  trayTakeMiniNow: "지금 미니 휴식하기",
  trayTakeLongNow: "지금 긴 휴식하기",
  trayPause1Hour: "1시간 동안 휴식 일시정지",
  trayResume: "휴식 재개",
  traySettings: "설정...",
  trayAbout: "eye-care 정보",
  trayQuit: "종료",
  noBreakScheduled: "예정된 휴식 없음",
  exercise20_20_20: "20-20-20 규칙",
  exerciseConsciousBlink: "의식적 깜빡임",
  exerciseNearFarFocus: "원근 촛점 교대",
  exerciseFigure8: "8자 추적",
  exercisePalming: "파밍 (손바닥 덮기)",
  exerciseHorizontalRolls: "좌우 눈 운동",
  guideLook20ft: "20피트(6m) 너머 보기",
  guideYou: "나",
  guideFarL: "왼쪽 먼 곳",
  guideFarR: "오른쪽 먼 곳",
  guideSlowBlink: "천천히 깜빡이기",
  guideNear: "가까이",
  guideFar: "멀리",
  guideTrace8: "눈으로 8자를 따라가세요",
  guideWarmPalms: "따뜻한 손바닥으로 눈 덮기",
  guideBreathe: "호흡",
  guideSweepLR: "시선을 좌에서 우로 천천히",
  guideL: "좌",
  guideR: "우",
  guideRestEyes: "눈 휴식",
  step20_20_20: "20피트(6m) 이상 먼 곳을 바라보세요 — 창밖이나 방 반대편.",
  stepBlinkClose: "부드럽게 2초간 눈을 감으세요.",
  stepBlinkOpen: "천천히 뜨세요. 편안한 속도로 반복합니다.",
  stepNearFocus: "손가락을 눈에서 25-38cm 거리에 두고 응시하세요.",
  stepFarFocus: "20피트(6m) 이상 먼 곳의 사물로 초점을 옮기세요.",
  stepNearBack: "다시 손가락으로.",
  stepFarBack: "다시 먼 곳으로. 부드럽게 반복하세요.",
  stepFigure8Imagine: "약 3m 앞 벽에 큰 8자가 있다고 상상하세요.",
  stepFigure8Trace: "머리는 움직이지 말고 눈만으로 한 방향으로 천천히 따라가세요.",
  stepFigure8Reverse: "반대 방향으로 되돌아 가세요.",
  stepPalmRub: "손바닥을 비벼 따뜻하게 만드세요.",
  stepPalmCover: "눈을 감고 손바닥을 눈 위에 덮으세요 (안구를 누르지 마세요).",
  stepPalmBreathe: "천천히 호흡하며 편안히 유지하세요.",
  stepHoriRight: "머리는 그대로 둔 채 시선을 편안한 오른쪽 끝으로.",
  stepHoriLeft: "시선을 천천히 왼쪽 끝으로 옮기세요.",
  stepHoriCenter: "다시 중앙으로.",
  stepHoriRepeat: "느린 좌우 스윕을 몇 번 더 반복하세요.",
};

const DICTS: Record<Language, Dict> = { en, ko };

export function t(lang: Language, key: TranslationKey): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}

export function getExerciseTranslations(lang: Language): Record<string, ExerciseTranslations> {
  return {
    "20-20-20": {
      name: t(lang, "exercise20_20_20"),
      shortDescription: lang === "ko" ? "20피트(6m) 너머를 20초간 바라보세요." : "Look at something 20 feet away for 20 seconds.",
      steps: [t(lang, "step20_20_20")],
    },
    "conscious-blink": {
      name: t(lang, "exerciseConsciousBlink"),
      shortDescription: lang === "ko" ? "천천히 깜빡여 눈을 적셔주세요." : "Blink slowly to remoisten your eyes.",
      steps: [t(lang, "stepBlinkClose"), t(lang, "stepBlinkOpen")],
    },
    "near-far-focus": {
      name: t(lang, "exerciseNearFarFocus"),
      shortDescription: lang === "ko" ? "가까운 곳과 먼 곳을 번갈아 응시하세요." : "Alternate focus between a near and distant target.",
      steps: [
        t(lang, "stepNearFocus"),
        t(lang, "stepFarFocus"),
        t(lang, "stepNearBack"),
        t(lang, "stepFarBack"),
      ],
    },
    "figure-eight": {
      name: t(lang, "exerciseFigure8"),
      shortDescription: lang === "ko" ? "상상의 8자를 눈으로 추적하며 안근을 이완하세요." : "Trace an imaginary figure-8 with your eyes to relax eye muscles.",
      steps: [
        t(lang, "stepFigure8Imagine"),
        t(lang, "stepFigure8Trace"),
        t(lang, "stepFigure8Reverse"),
      ],
    },
    "palming": {
      name: t(lang, "exercisePalming"),
      shortDescription: lang === "ko" ? "따뜻한 손바닥으로 감은 눈을 덮어 휴식하세요." : "Cover closed eyes with warm palms to relax.",
      steps: [
        t(lang, "stepPalmRub"),
        t(lang, "stepPalmCover"),
        t(lang, "stepPalmBreathe"),
      ],
    },
    "horizontal-rolls": {
      name: t(lang, "exerciseHorizontalRolls"),
      shortDescription: lang === "ko" ? "느린 좌우 눈 운동으로 피로를 풀어주세요." : "Slow horizontal eye movement to relieve fatigue.",
      steps: [
        t(lang, "stepHoriRight"),
        t(lang, "stepHoriLeft"),
        t(lang, "stepHoriCenter"),
        t(lang, "stepHoriRepeat"),
      ],
    },
  };
}