#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const electronPath = require("electron");
const appRoot = path.resolve(__dirname, "..");

if (!fs.existsSync(path.join(appRoot, "out", "main", "index.js"))) {
  console.error("eye-care: build output not found. Run `npm run build` first.");
  process.exit(1);
}

const child = spawn(electronPath, [appRoot], {
  stdio: "inherit",
  windowsHide: false,
});

child.on("close", (code) => {
  process.exit(code);
});