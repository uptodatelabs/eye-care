(function () {
  const STRINGS = {
    en: {
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
      exercises: {
        "20-20-20": "20-20-20 Rule",
        "conscious-blink": "Conscious Blinking",
        "near-far-focus": "Near-Far Focus Shift",
        "figure-eight": "Figure-8 Tracing",
        "palming": "Palming",
        "horizontal-rolls": "Horizontal Eye Rolls",
      },
      steps: {
        "20-20-20": ["Look at an object at least 20 feet (6 m) away — out a window or across the room."],
        "conscious-blink": ["Close your eyes gently and softly for 2 seconds.", "Open slowly. Repeat the slow blink at a relaxed pace."],
        "near-far-focus": ["Hold your finger 10-15 inches (25-38 cm) from your eyes and focus on it.", "Shift focus to an object 20 feet (6 m) or farther away.", "Back to your finger.", "Back to the distant object. Repeat smoothly."],
        "figure-eight": ["Imagine a large figure-8 on the wall about 10 feet (3 m) away.", "Slowly trace it one way with your eyes only (head still).", "Reverse direction and trace it back."],
        "palming": ["Rub your palms together until they feel warm.", "Close your eyes and cup your palms over them without pressing on the eyeballs.", "Breathe slowly and relax. Keep the position."],
        "horizontal-rolls": ["Look as far right as comfortable (head still).", "Slowly move your gaze to the far left.", "Back to center.", "Repeat the slow sweep a few more times."],
      },
      sources: {
        "20-20-20": "American Academy of Ophthalmology",
        "conscious-blink": "American Academy of Ophthalmology — Computer Vision Syndrome",
        "near-far-focus": "American Optometric Association — Computer Vision Initiative",
        "figure-eight": "American Academy of Ophthalmology — Eye Exercises",
        "palming": "American Academy of Ophthalmology — Eye Exercises",
        "horizontal-rolls": "American Academy of Ophthalmology — Eye Exercises",
      },
    },
    ko: {
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
      exercises: {
        "20-20-20": "20-20-20 규칙",
        "conscious-blink": "의식적 깜빡임",
        "near-far-focus": "원근 촛점 교대",
        "figure-eight": "8자 추적",
        "palming": "파밍 (손바닥 덮기)",
        "horizontal-rolls": "좌우 눈 운동",
      },
      steps: {
        "20-20-20": ["20피트(6m) 이상 먼 곳을 바라보세요 — 창밖이나 방 반대편."],
        "conscious-blink": ["부드럽게 2초간 눈을 감으세요.", "천천히 뜨세요. 편안한 속도로 반복합니다."],
        "near-far-focus": ["손가락을 눈에서 25-38cm 거리에 두고 응시하세요.", "20피트(6m) 이상 먼 곳의 사물로 초점을 옮기세요.", "다시 손가락으로.", "다시 먼 곳으로. 부드럽게 반복하세요."],
        "figure-eight": ["약 3m 앞 벽에 큰 8자가 있다고 상상하세요.", "머리는 움직이지 말고 눈만으로 한 방향으로 천천히 따라가세요.", "반대 방향으로 되돌아 가세요."],
        "palming": ["손바닥을 비벼 따뜻하게 만드세요.", "눈을 감고 손바닥을 눈 위에 덮으세요 (안구를 누르지 마세요).", "천천히 호흡하며 편안히 유지하세요."],
        "horizontal-rolls": ["머리는 그대로 둔 채 시선을 편안한 오른쪽 끝으로.", "시선을 천천히 왼쪽 끝으로 옮기세요.", "다시 중앙으로.", "느린 좌우 스윕을 몇 번 더 반복하세요."],
      },
      sources: {
        "20-20-20": "미국안과학회 (AAO)",
        "conscious-blink": "미국안과학회 — 컴퓨터 시력 증후군",
        "near-far-focus": "미국검안사협회 — 컴퓨터 시력 이니셔티브",
        "figure-eight": "미국안과학회 — 눈 운동",
        "palming": "미국안과학회 — 눈 운동",
        "horizontal-rolls": "미국안과학회 — 눈 운동",
      },
    },
  };

  let lang = "en";
  function tr(key) {
    const s = STRINGS[lang] || STRINGS.en;
    return s[key] || STRINGS.en[key] || key;
  }

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
  let soundEnabled = true;

  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        audioCtx = null;
      }
    }
    return audioCtx;
  }

  function playTone(freq, startAt, duration, gainValue) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(0, startAt);
    gain.gain.linearRampToValueAtTime(gainValue, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startAt);
    osc.stop(startAt + duration + 0.05);
  }

  function playChime(kind) {
    if (!soundEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    if (kind === "exercise-start") {
      playTone(660, now, 0.18, 0.18);
      playTone(880, now + 0.08, 0.22, 0.18);
    } else if (kind === "step-end") {
      playTone(523.25, now, 0.14, 0.12);
    } else if (kind === "break-complete") {
      playTone(523.25, now, 0.2, 0.18);
      playTone(659.25, now + 0.1, 0.2, 0.18);
      playTone(783.99, now + 0.2, 0.32, 0.2);
    }
  }

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

  function baseExerciseId(id) {
    return id.replace(/-\d+$/, "");
  }

  const GUIDES = {
    "20-20-20": function () {
      const group = el("g", {});
      group.appendChild(text(200, 30, tr("guideLook20ft"), "label"));
      group.appendChild(el("circle", { cx: 200, cy: 120, r: 14, className: "target" }));
      group.appendChild(text(200, 158, tr("guideYou"), "label"));
      group.appendChild(el("circle", { cx: 60, cy: 50, r: 22, className: "target" }));
      group.appendChild(text(60, 88, tr("guideFarL"), "label"));
      group.appendChild(el("circle", { cx: 340, cy: 50, r: 22, className: "target" }));
      group.appendChild(text(340, 88, tr("guideFarR"), "label"));
      const dot = el("circle", { cx: 0, cy: 0, r: 10, className: "dot dot-20-20-20" });
      group.appendChild(dot);
      return group;
    },

    "conscious-blink": function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, tr("guideSlowBlink"), "label"));
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
      group.appendChild(text(200, 40, tr("guideNear"), "label"));
      group.appendChild(text(200, 200, tr("guideFar"), "label"));
      group.appendChild(el("rect", { x: 185, y: 100, width: 30, height: 40, rx: 6, className: "target" }));
      const bar = el("rect", { x: 175, y: 80, width: 50, height: 80, rx: 6, className: "dot dot-near-far" });
      group.appendChild(bar);
      return group;
    },

    "figure-eight": function () {
      const group = el("g", {});
      group.appendChild(text(200, 30, tr("guideTrace8"), "label"));
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
      group.appendChild(text(200, 40, tr("guideWarmPalms"), "label"));
      group.appendChild(el("circle", { cx: 200, cy: 120, r: 60, fill: "#1a2240", stroke: "#4f8cff", "stroke-width": 2, opacity: 0.5 }));
      const glow = el("circle", { cx: 200, cy: 120, r: 50, fill: "#6bd4c0", opacity: 0.5, className: "palm-glow" });
      group.appendChild(glow);
      const breathe = text(200, 130, tr("guideBreathe"), "palm-breathe-text");
      group.appendChild(breathe);
      return group;
    },

    "horizontal-rolls": function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, tr("guideSweepLR"), "label"));
      group.appendChild(el("line", { x1: 80, y1: 120, x2: 320, y2: 120, stroke: "#4f8cff", "stroke-width": 2, opacity: 0.3 }));
      group.appendChild(el("circle", { cx: 80, cy: 120, r: 10, className: "target" }));
      group.appendChild(el("circle", { cx: 320, cy: 120, r: 10, className: "target" }));
      group.appendChild(text(80, 155, tr("guideL"), "label"));
      group.appendChild(text(320, 155, tr("guideR"), "label"));
      const dot = el("circle", { cx: 0, cy: 0, r: 10, className: "dot dot-horizontal" });
      group.appendChild(dot);
      return group;
    },

    rest: function () {
      const group = el("g", {});
      group.appendChild(text(200, 40, tr("guideRestEyes"), "label"));
      const ring = el("circle", { cx: 200, cy: 130, r: 80, fill: "none", stroke: "#4f8cff", "stroke-width": 2, opacity: 0.3 });
      group.appendChild(ring);
      const dot = el("circle", { cx: 200, cy: 130, r: 60, fill: "#6bd4c0", opacity: 0.5, className: "dot-rest" });
      group.appendChild(dot);
      return group;
    },
  };

  function renderGuide(exerciseId) {
    clearSvg();
    const base = baseExerciseId(exerciseId);
    const key = GUIDES[base] ? base : "rest";
    svgEl.appendChild(GUIDES[key]());
  }

  function exerciseName(id) {
    const base = baseExerciseId(id);
    const names = (STRINGS[lang] || STRINGS.en).exercises;
    return names[base] || base;
  }

  function exerciseSource(id) {
    const base = baseExerciseId(id);
    const sources = (STRINGS[lang] || STRINGS.en).sources;
    return sources[base] || "";
  }

  function stepTextFor(exerciseId, stepIndex) {
    const base = baseExerciseId(exerciseId);
    const steps = (STRINGS[lang] || STRINGS.en).steps;
    const arr = steps[base];
    if (arr && arr[stepIndex]) return arr[stepIndex];
    return "";
  }

  function loadStep() {
    if (!currentExercise) return;
    if (stepIndex >= currentSteps.length) {
      nextExercise();
      return;
    }
    const step = currentSteps[stepIndex];
    stepTextEl.textContent = stepTextFor(currentExercise.id, stepIndex) || step.text;
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
    exerciseNameEl.textContent = exerciseName(currentExercise.id);
    sourceEl.textContent = tr("sourcePrefix") + (exerciseSource(currentExercise.id) || currentExercise.source);
    sourceEl.onclick = function () { window.eyeCare.openSource(currentExercise.sourceUrl); };
    renderGuide(currentExercise.id);
    loadStep();
    playChime("exercise-start");
  }

  function finishBreak() {
    if (ticker) clearInterval(ticker);
    titleEl.textContent = tr("breakComplete");
    subtitleEl.textContent = tr("breakCompleteSubtitle");
    exerciseNameEl.textContent = "";
    stepTextEl.textContent = "";
    stepTimeEl.textContent = "";
    setProgress(100);
    clearSvg();
    svgEl.appendChild(GUIDES.rest());
    playChime("break-complete");
    setTimeout(function () { window.eyeCare.skipBreak(); }, 4000);
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
      playChime("step-end");
      stepIndex += 1;
      loadStep();
    }
  }

  skipBtn.addEventListener("click", function () {
    if (ticker) clearInterval(ticker);
    window.eyeCare.skipBreak();
  });

  const bgLayer = document.getElementById("bgLayer");

  function applyBackground(bg) {
    if (!bg || !bg.base64) {
      bgLayer.style.backgroundImage = "";
      return;
    }
    bgLayer.style.backgroundImage = "url(data:" + bg.mime + ";base64," + bg.base64 + ")";
  }

  window.eyeCare.onBreakStart(function (p) {
    plan = p;
    lang = p.language || "en";
    soundEnabled = p.soundEnabled !== false;
    document.documentElement.lang = lang;
    skipBtn.textContent = tr("skipBreak");
    applyBackground(p.background);
    totalDuration = p.totalDurationSeconds;
    totalElapsed = 0;
    if (p.type === "mini") {
      titleEl.textContent = tr("breakTitleMini");
      subtitleEl.textContent = tr("breakSubtitleMini");
    } else {
      titleEl.textContent = tr("breakTitleLong");
      subtitleEl.textContent = tr("breakSubtitleLong");
    }
    if (p.exercises.length === 0) {
      exerciseNameEl.textContent = tr("restEyes");
      stepTextEl.textContent = tr("restEyesInstruction");
      stepTimeEl.textContent = fmtTime(p.totalDurationSeconds);
      renderGuide("rest");
      playChime("exercise-start");
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
    exerciseNameEl.textContent = exerciseName(currentExercise.id);
    sourceEl.textContent = tr("sourcePrefix") + (exerciseSource(currentExercise.id) || currentExercise.source);
    sourceEl.onclick = function () { window.eyeCare.openSource(currentExercise.sourceUrl); };
    renderGuide(currentExercise.id);
    loadStep();
    playChime("exercise-start");
    ticker = setInterval(tick, 1000);
  });
})();