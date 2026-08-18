(function () {
  const ids = [
    "miniEnabled", "miniInterval", "miniDuration",
    "longEnabled", "longInterval", "longDuration",
    "soundEnabled", "strictMode",
  ];
  const els = {};
  ids.forEach(function (id) { els[id] = document.getElementById(id); });
  const statusEl = document.getElementById("status");
  let saveTimer = null;

  function showStatus(msg) {
    statusEl.textContent = msg;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { statusEl.textContent = ""; }, 2000);
  }

  function gatherPrefs() {
    return {
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
        showStatus("Saved");
      });
    }, 400);
  }

  ids.forEach(function (id) {
    const el = els[id];
    el.addEventListener("change", scheduleSave);
    el.addEventListener("input", scheduleSave);
  });

  window.eyeCare.getPreferences().then(function (prefs) {
    applyPrefs(prefs);
  });
})();