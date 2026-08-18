const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function makePng(W, H, pixelFn) {
  const pixels = Buffer.alloc(W * H * 4);
  pixelFn(W, H, pixels);
  const raw = Buffer.alloc(H * (1 + W * 4));
  for (let y = 0; y < H; y++) {
    raw[y * (1 + W * 4)] = 0;
    pixels.copy(raw, y * (1 + W * 4) + 1, y * W * 4, (y + 1) * W * 4);
  }
  const compressed = zlib.deflateSync(raw);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const png = Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", compressed), chunk("IEND", Buffer.alloc(0))]);
  return png;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function inCircle(cx, cy, r, x, y) {
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function drawEye(W, H, pixels) {
  const cx = W / 2;
  const cy = H / 2;
  const eyeW = W * 0.42;
  const eyeH = H * 0.28;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      const dx = (x - cx) / eyeW;
      const dy = (y - cy) / eyeH;
      const eyeShape = dx * dx + dy * dy <= 1;
      if (eyeShape) {
        r = 79; g = 140; b = 255; a = 255;
      }
      const pupilR = Math.min(W, H) * 0.14;
      if (inCircle(cx, cy, pupilR, x, y)) {
        r = 20; g = 30; b = 60; a = 255;
      }
      const glintR = Math.min(W, H) * 0.06;
      if (inCircle(cx - pupilR * 0.3, cy - pupilR * 0.3, glintR, x, y)) {
        r = 240; g = 245; b = 255; a = 255;
      }
      const i = (y * W + x) * 4;
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
      pixels[i + 3] = a;
    }
  }
}

function makeIco(sizes) {
  const pngs = sizes.map((s) => ({ size: s, png: makePng(s, s, drawEye) }));
  const headerSize = 6 + pngs.length * 16;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = headerSize;
  for (const { size, png } of pngs) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)]);
}

const dir = path.join(__dirname, "..", "build");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const trayPng = makePng(16, 16, drawEye);
fs.writeFileSync(path.join(dir, "tray.png"), trayPng);
fs.writeFileSync(path.join(dir, "tray@2x.png"), makePng(32, 32, drawEye));
console.log("Wrote build/tray.png, build/tray@2x.png");

const icon256 = makePng(256, 256, drawEye);
fs.writeFileSync(path.join(dir, "icon.png"), icon256);
console.log("Wrote build/icon.png (256x256)");

const ico = makeIco([16, 32, 48, 64, 128, 256]);
fs.writeFileSync(path.join(dir, "icon.ico"), ico);
console.log("Wrote build/icon.ico (" + ico.length + " bytes, multi-size)");