(function () {
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  const progressEl = document.getElementById("progress");
  const exerciseNameEl = document.getElementById("exerciseName");
  const stepTextEl = document.getElementById("stepText");
  const stepTimeEl = document.getElementById("stepTime");
  const sourceEl = document.getElementById("source");
  const skipBtn = document.getElementById("skipBtn");

  let totalElapsed = 0;
  let totalDuration = 1;
  let stepIndex = 0;
  let stepElapsed = 0;
  let currentSteps = [];
  let currentExercise = null;
  let plan = null;
  let ticker = null;

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m > 0) return m + ":" + String(sec).padStart(2, "0");
    return String(sec);
  }

  function setProgress(pct) {
    progressEl.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }

  function loadStep() {
    if (!currentExercise) return;
    if (stepIndex >= currentSteps.length) {
      nextExercise();
      return;
    }
    const step = currentSteps[stepIndex];
    stepTextEl.textContent = step.text;
    stepElapsed = 0;
    stepTimeEl.textContent = fmtTime(step.durationSeconds);
  }

  function nextExercise() {
    const idx = plan.exercises.indexOf(currentExercise);
    if (idx + 1 >= plan.exercises.length) {
      finishBreak();
      return;
    }
    currentExercise = plan.exercises[idx + 1];
    currentSteps = currentExercise.steps;
    stepIndex = 0;
    exerciseNameEl.textContent = currentExercise.name;
    sourceEl.textContent = "Source: " + currentExercise.source;
    sourceEl.onclick = () => window.eyeCare.openSource(currentExercise.sourceUrl);
    loadStep();
  }

  function finishBreak() {
    if (ticker) clearInterval(ticker);
    titleEl.textContent = "Break complete";
    subtitleEl.textContent = "Great job. Back to work!";
    exerciseNameEl.textContent = "";
    stepTextEl.textContent = "";
    stepTimeEl.textContent = "";
    setProgress(100);
    setTimeout(() => window.eyeCare.skipBreak(), 2000);
  }

  function tick() {
    totalElapsed += 1;
    setProgress((totalElapsed / totalDuration) * 100);
    if (!currentExercise) return;
    stepElapsed += 1;
    const step = currentSteps[stepIndex];
    if (!step) return;
    const remaining = step.durationSeconds - stepElapsed;
    stepTimeEl.textContent = fmtTime(remaining > 0 ? remaining : 0);
    if (remaining <= 0) {
      stepIndex += 1;
      loadStep();
    }
  }

  skipBtn.addEventListener("click", () => {
    if (ticker) clearInterval(ticker);
    window.eyeCare.skipBreak();
  });

  window.eyeCare.onBreakStart(function (p) {
    plan = p;
    totalDuration = p.totalDurationSeconds;
    totalElapsed = 0;
    if (p.type === "mini") {
      titleEl.textContent = "Mini eye break";
      subtitleEl.textContent = "A quick reset for your eyes.";
    } else {
      titleEl.textContent = "Long eye break";
      subtitleEl.textContent = "Follow the guided exercises.";
    }
    if (p.exercises.length === 0) {
      exerciseNameEl.textContent = "Rest your eyes";
      stepTextEl.textContent = "Look away from the screen and relax.";
      stepTimeEl.textContent = fmtTime(p.totalDurationSeconds);
      ticker = setInterval(function () {
        totalElapsed += 1;
        setProgress((totalElapsed / totalDuration) * 100);
        const remaining = totalDuration - totalElapsed;
        stepTimeEl.textContent = fmtTime(remaining > 0 ? remaining : 0);
        if (remaining <= 0) finishBreak();
      }, 1000);
      return;
    }
    currentExercise = p.exercises[0];
    currentSteps = currentExercise.steps;
    stepIndex = 0;
    exerciseNameEl.textContent = currentExercise.name;
    sourceEl.textContent = "Source: " + currentExercise.source;
    sourceEl.onclick = () => window.eyeCare.openSource(currentExercise.sourceUrl);
    loadStep();
    ticker = setInterval(tick, 1000);
  });
})();