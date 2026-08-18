const fs = require("fs");
const path = require("path");

const base64 =
  "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4AcXOMQEAIAwDwGwC/QO" +
  "7oQcDAcDg4GAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwGAwMDA" +
  "wMDAwMDAwMDAwMDAwMDAwBnqF0LAQfrgAAAAAElFTkSuQmCC";

const buf = Buffer.from(base64, "base64");
const dir = path.join(__dirname, "..", "build");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "tray.png"), buf);
console.log("Wrote build/tray.png (" + buf.length + " bytes)");