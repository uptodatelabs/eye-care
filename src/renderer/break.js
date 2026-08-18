(function () {
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  const progressEl = document.getElementById("progress");
  const exerciseNameEl = document.getElementById("exerciseName");
  const stepTextEl = document.getElementById("stepText");
  const stepTimeEl = document.getElementById("stepTime");
  const sourceEl = document.getElementById("source");
  const skipBtn = document.getElementById("skipBtn");
  const svgEl = document.getElementById("guideSvg");

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

  function clearSvg() {
    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
  }

  function el(name, attrs, children) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs) {
      for (const k in attrs) {
        if (k === "className") node.setAttribute("class", attrs[k]);
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function text(x, y, content, cls) {
    return el("text", { x: x, y: y, "text-anchor": "middle", className: cls || "label" }, content);
  }

  const GUIDES = {
    "20-20-20": function () {
      const group = el("g", {});
      group.appendChild(text(200, 30, "Look 20 ft (6 m) away", "label"));
      group.appendChild(el("circle", { cx: 200, cy: 120, r: 14, className: "target" }));
      group.appendChild(el("circle", { cx: 380, cy: 30, r: 22, className: "target" }));
      group.appendChild(text(380, 70, "far", "label"));
      group.appendChild(text(200, 160, "you", "label"));
      const dot = el("circle", { cx: 0, cy: 0, r: 10, className: "dot dot-20-20-20" });
      group.appendChild(dot);
      return group;
    },

    "conscious-blink": function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, "Slow blink", "label"));
      group.appendChild(el("ellipse", { cx: 200, cy: 120, rx: 60, ry: 32, className: "eye-outline" }));
      group.appendChild(el("circle", { cx: 200, cy: 120, r: 10, fill: "#4f8cff" }));
      const lidTop = el("ellipse", { cx: 200, cy: 88, rx: 62, ry: 32, className: "eye-lid lid-top" });
      const lidBottom = el("ellipse", { cx: 200, cy: 152, rx: 62, ry: 32, className: "eye-lid lid-bottom" });
      group.appendChild(lidTop);
      group.appendChild(lidBottom);
      return group;
    },

    "near-far-focus": function () {
      const group = el("g", {});
      group.appendChild(text(120, 40, "Near", "label"));
      group.appendChild(text(320, 40, "Far", "label"));
      group.appendChild(el("circle", { cx: 120, cy: 120, r: 24, className: "target" }));
      group.appendChild(el("circle", { cx: 320, cy: 120, r: 10, className: "target" }));
      const dot = el("circle", { cx: 0, cy: 0, r: 10, className: "dot dot-near-far" });
      group.appendChild(dot);
      return group;
    },

    "figure-eight": function () {
      const group = el("g", {});
      group.appendChild(text(200, 30, "Trace the 8 with your eyes", "label"));
      const path8 = el("path", {
        d: "M120,120 C120,80 200,80 200,120 C200,160 280,160 280,120 C280,80 200,80 200,120 C200,160 120,160 120,120 Z",
        fill: "none",
        stroke: "#4f8cff",
        "stroke-width": 2,
        opacity: 0.4,
      });
      group.appendChild(path8);
      const dot = el("circle", { r: 9, className: "dot dot-figure8", style: "offset-path: path('M120,120 C120,80 200,80 200,120 C200,160 280,160 280,120 C280,80 200,80 200,120 C200,160 120,160 120,120 Z'); offset-rotate: 0deg;" });
      group.appendChild(dot);
      return group;
    },

    "palming": function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, "Warm palms over closed eyes", "label"));
      group.appendChild(el("circle", { cx: 200, cy: 120, r: 60, fill: "#1a2240", stroke: "#4f8cff", "stroke-width": 2, opacity: 0.5 }));
      const glow = el("circle", { cx: 200, cy: 120, r: 50, fill: "#6bd4c0", opacity: 0.5, className: "palm-glow" });
      group.appendChild(glow);
      const breathe = text(200, 130, "breathe", "palm-breathe-text");
      group.appendChild(breathe);
      return group;
    },

    "horizontal-rolls": function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, "Sweep your gaze left to right", "label"));
      group.appendChild(el("line", { x1: 80, y1: 120, x2: 320, y2: 120, stroke: "#4f8cff", "stroke-width": 2, opacity: 0.3 }));
      group.appendChild(el("circle", { cx: 80, cy: 120, r: 10, className: "target" }));
      group.appendChild(el("circle", { cx: 320, cy: 120, r: 10, className: "target" }));
      group.appendChild(text(80, 155, "L", "label"));
      group.appendChild(text(320, 155, "R", "label"));
      const dot = el("circle", { cx: 0, cy: 0, r: 10, className: "dot dot-horizontal" });
      group.appendChild(dot);
      return group;
    },

    rest: function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, "Rest your eyes", "label"));
      const ring = el("circle", { cx: 200, cy: 120, r: 40, fill: "none", stroke: "#4f8cff", "stroke-width": 2, opacity: 0.3 });
      group.appendChild(ring);
      const dot = el("circle", { cx: 200, cy: 120, r: 20, fill: "#6bd4c0", opacity: 0.6, className: "dot-rest" });
      group.appendChild(dot);
      return group;
    },
  };

  function renderGuide(exerciseId) {
    clearSvg();
    const key = GUIDES[exerciseId] ? exerciseId : "rest";
    svgEl.appendChild(GUIDES[key]());
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
    sourceEl.onclick = function () { window.eyeCare.openSource(currentExercise.sourceUrl); };
    renderGuide(currentExercise.id);
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
    clearSvg();
    svgEl.appendChild(GUIDES.rest());
    setTimeout(function () { window.eyeCare.skipBreak(); }, 2500);
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

  skipBtn.addEventListener("click", function () {
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
      renderGuide("rest");
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
    sourceEl.onclick = function () { window.eyeCare.openSource(currentExercise.sourceUrl); };
    renderGuide(currentExercise.id);
    loadStep();
    ticker = setInterval(tick, 1000);
  });
})();