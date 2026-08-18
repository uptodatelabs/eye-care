(function () {
  const STRINGS = {
    en: {
      settingsTitle: "eye-care Settings",
      settingsHint: "Adjust break intervals and durations. Changes are saved automatically.",
      generalSection: "General",
      languageLabel: "Language",
      soundLabel: "Sound notifications",
      strictLabel: "Strict mode (no skip)",
      miniSection: "Mini break",
      miniEnableLabel: "Enable mini breaks",
      miniIntervalLabel: "Interval (minutes)",
      miniDurationLabel: "Duration (seconds)",
      longSection: "Long break",
      longEnableLabel: "Enable long breaks",
      longIntervalLabel: "Interval (minutes)",
      longDurationLabel: "Duration (seconds)",
      saved: "Saved",
      medicalDisclaimer:
        "eye-care is for eye-fatigue relief only. It is not a medical device and does not diagnose, treat, or cure any condition. If you experience persistent eye discomfort, consult a licensed ophthalmologist.",
    },
    ko: {
      settingsTitle: "eye-care 설정",
      settingsHint: "휴식 간격과 시간을 조정하세요. 변경사항은 자동 저장됩니다.",
      generalSection: "일반",
      languageLabel: "언어",
      soundLabel: "소리 알림",
      strictLabel: "엄격 모드 (건너뛰기 금지)",
      miniSection: "미니 휴식",
      miniEnableLabel: "미니 휴식 사용",
      miniIntervalLabel: "간격 (분)",
      miniDurationLabel: "시간 (초)",
      longSection: "긴 휴식",
      longEnableLabel: "긴 휴식 사용",
      longIntervalLabel: "간격 (분)",
      longDurationLabel: "시간 (초)",
      saved: "저장됨",
      medicalDisclaimer:
        "eye-care는 눈 피로 완화 목적입니다. 의료기기가 아니며 질환을 진단·치료·완치하지 않습니다. 지속적인 눈 불편함이 있다면 안과 전문의와 상담하세요.",
    },
  };

  const ids = [
    "miniEnabled", "miniInterval", "miniDuration",
    "longEnabled", "longInterval", "longDuration",
    "soundEnabled", "strictMode", "language",
  ];
  const els = {};
  ids.forEach(function (id) { els[id] = document.getElementById(id); });
  const statusEl = document.getElementById("status");
  const textEls = {
    settingsTitle: document.getElementById("settingsTitle"),
    settingsHint: document.getElementById("settingsHint"),
    generalSection: document.getElementById("generalSection"),
    languageLabel: document.getElementById("languageLabel"),
    soundLabel: document.getElementById("soundLabel"),
    strictLabel: document.getElementById("strictLabel"),
    miniSection: document.getElementById("miniSection"),
    miniEnableLabel: document.getElementById("miniEnableLabel"),
    miniIntervalLabel: document.getElementById("miniIntervalLabel"),
    miniDurationLabel: document.getElementById("miniDurationLabel"),
    longSection: document.getElementById("longSection"),
    longEnableLabel: document.getElementById("longEnableLabel"),
    longIntervalLabel: document.getElementById("longIntervalLabel"),
    longDurationLabel: document.getElementById("longDurationLabel"),
    medicalDisclaimer: document.getElementById("medicalDisclaimer"),
  };
  let currentLang = "en";
  let saveTimer = null;

  function applyLang(lang) {
    currentLang = lang;
    const s = STRINGS[lang] || STRINGS.en;
    document.documentElement.lang = lang;
    for (const k in textEls) {
      if (textEls[k] && s[k]) textEls[k].textContent = s[k];
    }
  }

  function showStatus(msg) {
    statusEl.textContent = msg;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { statusEl.textContent = ""; }, 2000);
  }

  function gatherPrefs() {
    return {
      language: els.language.value,
      miniBreakEnabled: els.miniEnabled.checked,
      miniBreakIntervalMinutes: parseInt(els.miniInterval.value, 10) || 20,
      miniBreakDurationSeconds: parseInt(els.miniDuration.value, 10) || 20,
      longBreakEnabled: els.longEnabled.checked,
      longBreakIntervalMinutes: parseInt(els.longInterval.value, 10) || 50,
      longBreakDurationSeconds: parseInt(els.longDuration.value, 10) || 300,
      soundEnabled: els.soundEnabled.checked,
      strictMode: els.strictMode.checked,
    };
  }

  function applyPrefs(prefs) {
    if (prefs.language) {
      els.language.value = prefs.language;
      applyLang(prefs.language);
    }
    els.miniEnabled.checked = !!prefs.miniBreakEnabled;
    els.miniInterval.value = prefs.miniBreakIntervalMinutes;
    els.miniDuration.value = prefs.miniBreakDurationSeconds;
    els.longEnabled.checked = !!prefs.longBreakEnabled;
    els.longInterval.value = prefs.longBreakIntervalMinutes;
    els.longDuration.value = prefs.longBreakDurationSeconds;
    els.soundEnabled.checked = !!prefs.soundEnabled;
    els.strictMode.checked = !!prefs.strictMode;
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      window.eyeCare.updatePreferences(gatherPrefs()).then(function () {
        showStatus(STRINGS[currentLang].saved);
      });
    }, 400);
  }

  els.language.addEventListener("change", function () {
    applyLang(els.language.value);
    scheduleSave();
  });

  ids.forEach(function (id) {
    const el = els[id];
    if (id === "language") return;
    el.addEventListener("change", scheduleSave);
    el.addEventListener("input", scheduleSave);
  });

  window.eyeCare.getPreferences().then(function (prefs) {
    applyPrefs(prefs);
  });
})();