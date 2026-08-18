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
      bgSection: "Background",
      bgModeLabel: "Background mode",
      bgNone: "None",
      bgBuiltin: "Built-in",
      bgUser: "User images",
      bgAdd: "Add image...",
      bgDelete: "Delete selected",
      bgHintNone: "No background shown during breaks.",
      bgHintBuiltin: "Choose a built-in nature scene for restful breaks.",
      bgHintUser: "Add your own images. Soft, low-contrast nature scenes work best.",
      bgNoImages: "No user images yet. Click \"Add image...\" to select one.",
      bgAdded: "Added: ",
      bgDeleted: "Deleted: ",
      bgSelectPrompt: "Select an image first.",
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
      bgSection: "배경화면",
      bgModeLabel: "배경 모드",
      bgNone: "없음",
      bgBuiltin: "기본 제공",
      bgUser: "사용자 이미지",
      bgAdd: "이미지 추가...",
      bgDelete: "선택 삭제",
      bgHintNone: "휴식 중 배경화면을 표시하지 않습니다.",
      bgHintBuiltin: "편안한 휴식을 위한 기본 자연 풍경을 선택하세요.",
      bgHintUser: "직접 이미지를 추가할 수 있어요. 부드럽고 저대비 자연 풍경이 가장 좋습니다.",
      bgNoImages: "사용자 이미지가 없습니다. \"이미지 추가...\"를 눌러 선택하세요.",
      bgAdded: "추가됨: ",
      bgDeleted: "삭제됨: ",
      bgSelectPrompt: "이미지를 먼저 선택하세요.",
      medicalDisclaimer:
        "eye-care는 눈 피로 완화 목적입니다. 의료기기가 아니며 질환을 진단·치료·완치하지 않습니다. 지속적인 눈 불편함이 있다면 안과 전문의와 상담하세요.",
    },
  };

  const ids = [
    "miniEnabled", "miniInterval", "miniDuration",
    "longEnabled", "longInterval", "longDuration",
    "soundEnabled", "strictMode", "language", "bgMode",
  ];
  const els = {};
  ids.forEach(function (id) { els[id] = document.getElementById(id); });
  const statusEl = document.getElementById("status");
  const bgGallery = document.getElementById("bgGallery");
  const bgAddBtn = document.getElementById("bgAddBtn");
  const bgDeleteBtn = document.getElementById("bgDeleteBtn");
  const bgHintEl = document.getElementById("bgHint");

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
    bgSection: document.getElementById("bgSection"),
    bgModeLabel: document.getElementById("bgModeLabel"),
    medicalDisclaimer: document.getElementById("medicalDisclaimer"),
  };

  let currentLang = "en";
  let saveTimer = null;
  let bgConfig = { mode: "builtin", selected: "sunny-sky", userImages: [] };
  let selectedBgName = null;

  function tr(key) {
    const s = STRINGS[currentLang] || STRINGS.en;
    return s[key] || STRINGS.en[key] || key;
  }

  function applyLang(lang) {
    currentLang = lang;
    const s = STRINGS[lang] || STRINGS.en;
    document.documentElement.lang = lang;
    for (const k in textEls) {
      if (textEls[k] && s[k]) textEls[k].textContent = s[k];
    }
    const mode = els.bgMode.value;
    if (mode === "none") bgHintEl.textContent = tr("bgHintNone");
    else if (mode === "builtin") bgHintEl.textContent = tr("bgHintBuiltin");
    else bgHintEl.textContent = tr("bgHintUser");
    renderBgGallery();
  }

  function showStatus(msg) {
    statusEl.textContent = msg;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { statusEl.textContent = ""; }, 2000);
  }

  function gatherPrefs() {
    return {
      language: els.language.value,
      background: bgConfig,
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
    if (prefs.background) {
      bgConfig = prefs.background;
      els.bgMode.value = bgConfig.mode || "builtin";
      selectedBgName = bgConfig.selected || null;
    }
    els.miniEnabled.checked = !!prefs.miniBreakEnabled;
    els.miniInterval.value = prefs.miniBreakIntervalMinutes;
    els.miniDuration.value = prefs.miniBreakDurationSeconds;
    els.longEnabled.checked = !!prefs.longBreakEnabled;
    els.longInterval.value = prefs.longBreakIntervalMinutes;
    els.longDuration.value = prefs.longBreakDurationSeconds;
    els.soundEnabled.checked = !!prefs.soundEnabled;
    els.strictMode.checked = !!prefs.strictMode;
    renderBgGallery();
  }

  function renderBgGallery() {
    while (bgGallery.firstChild) bgGallery.removeChild(bgGallery.firstChild);
    const mode = els.bgMode.value;
    if (mode === "none") {
      bgAddBtn.disabled = false;
      bgDeleteBtn.disabled = true;
      return;
    }
    bgAddBtn.disabled = false;
    bgDeleteBtn.disabled = mode !== "user" || !selectedBgName;

    const list = mode === "builtin"
      ? window.eyeCare.backgrounds.listBuiltin()
      : window.eyeCare.backgrounds.listUser();

    Promise.resolve(list).then(function (names) {
      if (!names || names.length === 0) {
        const empty = document.createElement("p");
        empty.className = "bg-hint";
        empty.textContent = tr("bgNoImages");
        bgGallery.appendChild(empty);
        return;
      }
      names.forEach(function (name) {
        const thumb = document.createElement("div");
        thumb.className = "bg-thumb";
        if (name === selectedBgName) thumb.classList.add("selected");
        thumb.dataset.name = name;
        thumb.addEventListener("click", function () {
          selectedBgName = name;
          bgConfig.selected = name;
          Array.prototype.forEach.call(bgGallery.children, function (c) {
            c.classList.remove("selected");
          });
          thumb.classList.add("selected");
          scheduleSave();
        });
        window.eyeCare.backgrounds.loadFile(name, mode).then(function (res) {
          if (!res) return;
          const img = document.createElement("img");
          img.src = "data:" + res.mime + ";base64," + res.data;
          img.alt = name;
          thumb.appendChild(img);
        });
        const label = document.createElement("div");
        label.className = "bg-name";
        label.textContent = name;
        thumb.appendChild(label);
        bgGallery.appendChild(thumb);
      });
    });
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      bgConfig.mode = els.bgMode.value;
      if (selectedBgName) bgConfig.selected = selectedBgName;
      window.eyeCare.updatePreferences(gatherPrefs()).then(function () {
        showStatus(STRINGS[currentLang].saved);
      });
    }, 400);
  }

  els.language.addEventListener("change", function () {
    applyLang(els.language.value);
    scheduleSave();
  });

  els.bgMode.addEventListener("change", function () {
    const mode = els.bgMode.value;
    bgConfig.mode = mode;
    if (mode === "none") {
      bgHintEl.textContent = tr("bgHintNone");
    } else if (mode === "builtin") {
      bgHintEl.textContent = tr("bgHintBuiltin");
      if (!window.eyeCare.backgrounds.listBuiltin().includes(bgConfig.selected)) {
        bgConfig.selected = "sunny-sky";
        selectedBgName = "sunny-sky";
      }
    } else {
      bgHintEl.textContent = tr("bgHintUser");
      selectedBgName = bgConfig.userImages[0] || null;
      bgConfig.selected = selectedBgName || "";
    }
    renderBgGallery();
    scheduleSave();
  });

  bgAddBtn.addEventListener("click", function () {
    if (els.bgMode.value !== "user") {
      els.bgMode.value = "user";
      bgConfig.mode = "user";
      bgHintEl.textContent = tr("bgHintUser");
    }
    window.eyeCare.backgrounds.addUser().then(function (res) {
      if (res && res.added && res.added.length > 0) {
        showStatus(tr("bgAdded") + res.added.join(", "));
        const cfg = window.eyeCare.backgrounds.get();
        Promise.resolve(cfg).then(function (c) {
          bgConfig = c;
          if (bgConfig.userImages.length > 0) {
            bgConfig.selected = bgConfig.userImages[0];
            selectedBgName = bgConfig.userImages[0];
          }
          renderBgGallery();
          scheduleSave();
        });
      } else if (res && res.added && res.added.length === 0) {
        showStatus(currentLang === "ko" ? "선택된 파일이 없습니다." : "No file selected.");
      }
    }).catch(function (err) {
      console.error("addUser failed:", err);
      showStatus(currentLang === "ko" ? "오류: " + (err && err.message ? err.message : "") : "Error: " + (err && err.message ? err.message : ""));
    });
  });

  bgDeleteBtn.addEventListener("click", function () {
    if (!selectedBgName) {
      showStatus(tr("bgSelectPrompt"));
      return;
    }
    window.eyeCare.backgrounds.deleteUser(selectedBgName).then(function () {
      showStatus(tr("bgDeleted") + selectedBgName);
      const cfg = window.eyeCare.backgrounds.get();
      Promise.resolve(cfg).then(function (c) {
        bgConfig = c;
        selectedBgName = bgConfig.userImages[0] || null;
        bgConfig.selected = selectedBgName || "";
        renderBgGallery();
      });
    });
  });

  ids.forEach(function (id) {
    const el = els[id];
    if (id === "language" || id === "bgMode") return;
    el.addEventListener("change", scheduleSave);
    el.addEventListener("input", scheduleSave);
  });

  window.eyeCare.getPreferences().then(function (prefs) {
    applyPrefs(prefs);
  });
})();