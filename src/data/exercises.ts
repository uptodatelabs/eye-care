import { Exercise } from "../shared/types";

export const EXERCISES: Exercise[] = [
  {
    id: "20-20-20",
    name: "20-20-20 Rule",
    shortDescription: "Look at something 20 feet away for 20 seconds.",
    steps: [
      {
        text: "Look at an object at least 20 feet (6 m) away — out a window or across the room.",
        durationSeconds: 20,
      },
    ],
    source: "American Academy of Ophthalmology",
    sourceUrl: "https://www.aao.org/eye-health/tips-prevention/computer-vision-syndrome",
    forBreakTypes: ["mini", "long"],
  },
  {
    id: "conscious-blink",
    name: "Conscious Blinking",
    shortDescription: "Blink slowly to remoisten your eyes.",
    steps: [
      { text: "Close your eyes gently and softly for 2 seconds.", durationSeconds: 2 },
      { text: "Open slowly. Repeat the slow blink at a relaxed pace.", durationSeconds: 18 },
    ],
    source: "American Academy of Ophthalmology — Computer Vision Syndrome",
    sourceUrl: "https://www.aao.org/eye-health/tips-prevention/computer-vision-syndrome",
    forBreakTypes: ["mini", "long"],
  },
  {
    id: "near-far-focus",
    name: "Near-Far Focus Shift",
    shortDescription: "Alternate focus between a near and distant target.",
    steps: [
      { text: "Hold your finger 10-15 inches (25-38 cm) from your eyes and focus on it.", durationSeconds: 5 },
      { text: "Shift focus to an object 20 feet (6 m) or farther away.", durationSeconds: 5 },
      { text: "Back to your finger.", durationSeconds: 5 },
      { text: "Back to the distant object. Repeat smoothly.", durationSeconds: 5 },
    ],
    source: "American Optometric Association — Computer Vision Initiative",
    sourceUrl: "https://www.aoa.org/healthy-eyes/caring-for-your-eyes/protecting-your-eyes/computer-vision-syndrome",
    forBreakTypes: ["long"],
  },
  {
    id: "figure-eight",
    name: "Figure-8 Tracing",
    shortDescription: "Trace an imaginary figure-8 with your eyes to relax eye muscles.",
    steps: [
      { text: "Imagine a large figure-8 on the wall about 10 feet (3 m) away.", durationSeconds: 5 },
      { text: "Slowly trace it one way with your eyes only (head still).", durationSeconds: 10 },
      { text: "Reverse direction and trace it back.", durationSeconds: 10 },
    ],
    source: "American Academy of Ophthalmology — Eye Exercises",
    sourceUrl: "https://www.aao.org/eye-health/tips-prevention/eye-exercises",
    forBreakTypes: ["long"],
  },
  {
    id: "palming",
    name: "Palming",
    shortDescription: "Cover closed eyes with warm palms to relax.",
    steps: [
      { text: "Rub your palms together until they feel warm.", durationSeconds: 5 },
      { text: "Close your eyes and cup your palms over them without pressing on the eyeballs.", durationSeconds: 30 },
      { text: "Breathe slowly and relax. Keep the position.", durationSeconds: 25 },
    ],
    source: "American Academy of Ophthalmology — Eye Exercises",
    sourceUrl: "https://www.aao.org/eye-health/tips-prevention/eye-exercises",
    forBreakTypes: ["long"],
  },
  {
    id: "horizontal-rolls",
    name: "Horizontal Eye Rolls",
    shortDescription: "Slow horizontal eye movement to relieve fatigue.",
    steps: [
      { text: "Look as far right as comfortable (head still).", durationSeconds: 4 },
      { text: "Slowly move your gaze to the far left.", durationSeconds: 4 },
      { text: "Back to center.", durationSeconds: 2 },
      { text: "Repeat the slow sweep a few more times.", durationSeconds: 10 },
    ],
    source: "American Academy of Ophthalmology — Eye Exercises",
    sourceUrl: "https://www.aao.org/eye-health/tips-prevention/eye-exercises",
    forBreakTypes: ["mini", "long"],
  },
];

export function exercisesForBreak(type: "mini" | "long", durationSeconds: number): Exercise[] {
  const pool = EXERCISES.filter((e) => e.forBreakTypes.includes(type));
  const selected: Exercise[] = [];
  let used = 0;
  for (const ex of pool) {
    const exTotal = ex.steps.reduce((s, st) => s + st.durationSeconds, 0);
    if (used + exTotal <= durationSeconds) {
      selected.push(ex);
      used += exTotal;
    }
  }
  return selected;
}