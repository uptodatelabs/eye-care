const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const W = 16;
const H = 16;

const pixels = Buffer.alloc(W * H * 4);

function setPixel(x, y, r, g, b, a) {
  const i = (y * W + x) * 4;
  pixels[i] = r;
  pixels[i + 1] = g;
  pixels[i + 2] = b;
  pixels[i + 3] = a;
}

function inCircle(cx, cy, r, x, y) {
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function inRing(cx, cy, rOuter, rInner, x, y) {
  return inCircle(cx, cy, rOuter, x, y) && !inCircle(cx, cy, rInner, x, y);
}

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let r = 0, g = 0, b = 0, a = 0;

    const eyeShape =
      (x >= 2 && x <= 13 && y >= 5 && y <= 10) &&
      Math.abs(5.5 - y) <= 4.5 - 0.6 * Math.abs(7.5 - x);

    if (eyeShape) {
      r = 79; g = 140; b = 255; a = 255;
    }

    if (inCircle(7.5, 7.5, 2.2, x, y)) {
      r = 20; g = 30; b = 60; a = 255;
    }
    if (inCircle(7.5, 7.5, 0.9, x, y)) {
      r = 240; g = 245; b = 255; a = 255;
    }

    setPixel(x, y, r, g, b, a);
  }
}

const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0;
  pixels.copy(raw, y * (1 + W * 4) + 1, y * W * 4, (y + 1) * W * 4);
}

const compressed = zlib.deflateSync(raw);

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

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", compressed),
  chunk("IEND", Buffer.alloc(0)),
]);

const dir = path.join(__dirname, "..", "build");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "tray.png"), png);
fs.writeFileSync(path.join(dir, "tray@2x.png"), png);
console.log("Wrote build/tray.png (" + png.length + " bytes, " + W + "x" + H + ")");
console.log("Wrote build/tray@2x.png");