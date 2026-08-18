const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcRenderer = path.join(root, "src", "renderer");
const outRenderer = path.join(root, "out", "renderer");

if (!fs.existsSync(outRenderer)) {
  fs.mkdirSync(outRenderer, { recursive: true });
}

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

copyDir(srcRenderer, outRenderer);
console.log("Copied renderer static files to out/renderer");