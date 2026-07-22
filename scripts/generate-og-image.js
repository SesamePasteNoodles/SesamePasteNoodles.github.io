/* global console */
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import zlib from 'node:zlib'

function createPngBuffer(width: number, height: number, drawPixel: (x: number, y: number, w: number, h: number) => number[]) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

  // Helper for CRC32
  const crcTable = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1)
      else c = c >>> 1
    }
    crcTable[n] = c
  }

  function crc32(buf: Buffer) {
    let crc = 0xffffffff
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
    }
    return (crc ^ 0xffffffff) >>> 0
  }

  function createChunk(type: string, data: Buffer) {
    const lenBuf = Buffer.alloc(4)
    lenBuf.writeUInt32BE(data.length, 0)
    const typeBuf = Buffer.from(type, 'ascii')
    const crcBuf = Buffer.alloc(4)
    const crc = crc32(Buffer.concat([typeBuf, data]))
    crcBuf.writeUInt32BE(crc, 0)
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
  }

  // IHDR
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8 // bit depth
  ihdrData[9] = 6 // color type RGBA
  ihdrData[10] = 0 // compression
  ihdrData[11] = 0 // filter
  ihdrData[12] = 0 // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData)

  // Scanlines: width * 4 + 1 (filter byte)
  const rawData = Buffer.alloc(height * (width * 4 + 1))
  let pos = 0

  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0 // Filter type 0 (None)
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

// Design: Deep Navy (#081526), Gold (#d6a928), Soft Navy Card (#10243e), White Text (#f2f1ec)
const width = 1200
const height = 630

const pngBuffer = createPngBuffer(width, height, (x, y) => {
  // Border (gold top rail)
  if (y < 12) {
    return [0xd6, 0xa9, 0x28, 0xff] // Gold bar
  }
  // Gold left rail (narrow section rail: x < 30)
  if (x < 16) {
    return [0xd6, 0xa9, 0x28, 0xff]
  }

  // Card area (centered bento box with gold border)
  const isCardArea = x >= 80 && x <= 1120 && y >= 70 && y <= 560
  const isCardBorder =
    isCardArea && (x === 80 || x === 1120 || y === 70 || y === 560 || x === 81 || x === 1119 || y === 71 || y === 559)

  if (isCardBorder) {
    return [0xd6, 0xa9, 0x28, 0x88] // Semi-transparent gold border
  }

  if (isCardArea) {
    // Grid lines on card
    if (x % 60 === 0 || y % 60 === 0) {
      return [0x22, 0x38, 0x54, 0xff]
    }
    return [0x10, 0x24, 0x3e, 0xff] // Soft Navy card fill
  }

  // Outer background: Deep Navy
  // Subtle background grid
  if (x % 40 === 0 || y % 40 === 0) {
    return [0x12, 0x24, 0x3a, 0xff]
  }
  return [0x08, 0x15, 0x26, 0xff]
})

const outPath = path.resolve(process.cwd(), 'public/og-default.png')
fs.writeFileSync(outPath, pngBuffer)
console.log(`Generated default Open Graph image: ${outPath} (${pngBuffer.length} bytes)`)
