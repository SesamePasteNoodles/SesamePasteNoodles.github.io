/* global console */
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import zlib from 'node:zlib'

function createPngBuffer(width, height, drawPixel) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

  const crcTable = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1)
      else c = c >>> 1
    }
    crcTable[n] = c
  }

  function crc32(buf) {
    let crc = 0xffffffff
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
    }
    return (crc ^ 0xffffffff) >>> 0
  }

  function createChunk(type, data) {
    const lenBuf = Buffer.alloc(4)
    lenBuf.writeUInt32BE(data.length, 0)
    const typeBuf = Buffer.from(type, 'ascii')
    const crcBuf = Buffer.alloc(4)
    const crc = crc32(Buffer.concat([typeBuf, data]))
    crcBuf.writeUInt32BE(crc, 0)
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
  }

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8
  ihdrData[9] = 6
  ihdrData[10] = 0
  ihdrData[11] = 0
  ihdrData[12] = 0
  const ihdrChunk = createChunk('IHDR', ihdrData)

  const rawData = Buffer.alloc(height * (width * 4 + 1))
  let pos = 0

  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixel(x, y, width, height)
      rawData[pos++] = r
      rawData[pos++] = g
      rawData[pos++] = b
      rawData[pos++] = a
    }
  }

  const compressedData = zlib.deflateSync(rawData)
  const idatChunk = createChunk('IDAT', compressedData)
  const iendChunk = createChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

// Icon design: Round-rect Gold background (#d6a928), Dark Navy monogram RC (#081526)
function drawRcIcon(x, y, width, height) {
  const pad = Math.floor(width * 0.1)
  const rx = Math.floor(width * 0.2)

  // Rounded rectangle bounds check
  const inOuter = x >= pad && x < width - pad && y >= pad && y < height - pad
  if (!inOuter) return [0, 0, 0, 0] // transparent background

  // Border radius check for 4 corners
  const leftX = pad + rx
  const rightX = width - pad - rx
  const topY = pad + rx
  const bottomY = height - pad - rx

  let distSq = 0
  if (x < leftX && y < topY) distSq = Math.pow(x - leftX, 2) + Math.pow(y - topY, 2)
  else if (x > rightX && y < topY) distSq = Math.pow(x - rightX, 2) + Math.pow(y - topY, 2)
  else if (x < leftX && y > bottomY) distSq = Math.pow(x - leftX, 2) + Math.pow(y - bottomY, 2)
  else if (x > rightX && y > bottomY) distSq = Math.pow(x - rightX, 2) + Math.pow(y - bottomY, 2)

  if (distSq > Math.pow(rx, 2)) return [0, 0, 0, 0]

  // Monogram "RC" drawing in center
  const cx = x / width
  const cy = y / height

  // "R" vertical bar: cx [0.28..0.38], cy [0.28..0.72]
  const isRBar = cx >= 0.28 && cx <= 0.36 && cy >= 0.28 && cy <= 0.72
  // "R" top loop
  const isRLoopTop = cx >= 0.36 && cx <= 0.52 && cy >= 0.28 && cy <= 0.36
  const isRLoopRight = cx >= 0.44 && cx <= 0.52 && cy >= 0.36 && cy <= 0.5
  const isRLoopBottom = cx >= 0.36 && cx <= 0.52 && cy >= 0.46 && cy <= 0.54
  // "R" leg
  const isRLeg = cx >= 0.42 && cx <= 0.52 && cy >= 0.52 && cy <= 0.72 && cy - cx <= 0.25

  // "C" top bar
  const isCTop = cx >= 0.58 && cx <= 0.74 && cy >= 0.28 && cy <= 0.36
  // "C" left bar
  const isCLeft = cx >= 0.58 && cx <= 0.66 && cy >= 0.36 && cy <= 0.64
  // "C" bottom bar
  const isCBottom = cx >= 0.58 && cx <= 0.74 && cy >= 0.64 && cy <= 0.72

  if (isRBar || isRLoopTop || isRLoopRight || isRLoopBottom || isRLeg || isCTop || isCLeft || isCBottom) {
    return [0x08, 0x15, 0x26, 0xff] // Deep Navy text
  }

  return [0xd6, 0xa9, 0x28, 0xff] // Gold background
}

// Generate favicon-32x32.png
const buf32 = createPngBuffer(32, 32, (x, y, w, h) => drawRcIcon(x, y, w, h))
fs.writeFileSync(path.resolve(process.cwd(), 'public/favicon-32x32.png'), buf32)

// Generate apple-touch-icon.png (180x180)
const buf180 = createPngBuffer(180, 180, (x, y, w, h) => drawRcIcon(x, y, w, h))
fs.writeFileSync(path.resolve(process.cwd(), 'public/apple-touch-icon.png'), buf180)

console.log('Generated favicon-32x32.png and apple-touch-icon.png successfully.')
