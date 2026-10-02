// Genera los iconos PNG de la PWA sin dependencias externas.
// Ejecutar con: npm run icons
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons')

const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function encodePng(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0 // filtro "none"
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const mix = (a, b, t) => a + (b - a) * t
// Antialias: cobertura suave alrededor del borde de una funcion de distancia con signo.
const cover = (sd, aa) => clamp01(0.5 - sd / aa)

function roundedRectSd(x, y, w, h, r) {
  const qx = Math.abs(x - w / 2) - (w / 2 - r)
  const qy = Math.abs(y - h / 2) - (h / 2 - r)
  const ax = Math.max(qx, 0)
  const ay = Math.max(qy, 0)
  return Math.min(Math.max(qx, qy), 0) + Math.hypot(ax, ay) - r
}

const circleSd = (x, y, cx, cy, r) => Math.hypot(x - cx, y - cy) - r

// Segmento de linea con grosor (para la nervadura de la hoja).
function segmentSd(x, y, ax, ay, bx, by, r) {
  const pax = x - ax
  const pay = y - ay
  const bax = bx - ax
  const bay = by - ay
  const h = clamp01((pax * bax + pay * bay) / (bax * bax + bay * bay))
  return Math.hypot(pax - bax * h, pay - bay * h) - r
}

function drawIcon(size, { maskable = false } = {}) {
  const px = Buffer.alloc(size * size * 4)
  const aa = size / 256
  const radius = maskable ? size : size * 0.235
  const s = maskable ? 0.62 : 0.78 // escala del simbolo dentro del lienzo
  const c = size / 2
  const r = size * 0.40 * (s / 0.78)

  // Centros de los dos circulos cuya interseccion forma la hoja.
  const off = r * 0.55
  const ax = c - off
  const ay = c + off
  const bx = c + off
  const by = c - off
  // Las puntas de la hoja son los cortes de ambos circulos, sobre la diagonal.
  const tip = Math.sqrt(Math.max(r * r - 2 * off * off, 0)) / Math.SQRT2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const fx = x + 0.5
      const fy = y + 0.5

      // Fondo: degradado diagonal verde oscuro -> verde marca.
      const t = clamp01((fx / size) * 0.45 + (fy / size) * 0.55)
      let R = mix(6, 25, t)
      let G = mix(39, 132, t)
      let B = mix(27, 84, t)
      let A = cover(roundedRectSd(fx, fy, size, size, radius), aa) * 255

      // Hoja blanca = interseccion de los dos circulos.
      const leaf = Math.max(circleSd(fx, fy, ax, ay, r), circleSd(fx, fy, bx, by, r))
      const leafA = cover(leaf, aa)
      if (leafA > 0) {
        R = mix(R, 255, leafA)
        G = mix(G, 255, leafA)
        B = mix(B, 255, leafA)
      }

      // Nervadura: linea que une las dos puntas de la hoja.
      const rib = segmentSd(fx, fy, c - tip, c - tip, c + tip, c + tip, size * 0.017)
      const ribA = cover(rib, aa) * leafA
      if (ribA > 0) {
        R = mix(R, 6, ribA)
        G = mix(G, 39, ribA)
        B = mix(B, 27, ribA)
      }

      px[i] = Math.round(R)
      px[i + 1] = Math.round(G)
      px[i + 2] = Math.round(B)
      px[i + 3] = Math.round(A)
    }
  }
  return encodePng(size, size, px)
}

mkdirSync(OUT, { recursive: true })
const files = [
  ['icon-192.png', drawIcon(192)],
  ['icon-512.png', drawIcon(512)],
  ['maskable-512.png', drawIcon(512, { maskable: true })],
  ['apple-touch-icon.png', drawIcon(180, { maskable: true })],
]
for (const [name, buf] of files) {
  writeFileSync(join(OUT, name), buf)
  console.log('  ✓', name, `(${(buf.length / 1024).toFixed(1)} KB)`)
}
