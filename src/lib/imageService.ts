import sharp from 'sharp'
import { writeFile, unlink, stat } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// ── Upload directory ─────────────────────────────────────
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure directory exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true })
}

// ── Types ────────────────────────────────────────────────
export interface CompressResult {
  outputPath:      string
  outputFileName:  string
  downloadUrl:     string
  originalSize:    number
  compressedSize:  number
  savingsPct:      number
}

export interface ConvertResult {
  outputPath:     string
  outputFileName: string
  downloadUrl:    string
}

// ── Helpers ──────────────────────────────────────────────
async function saveBuffer(buffer: Buffer, ext: string): Promise<{ filePath: string; fileName: string }> {
  const fileName = `${uuidv4()}.${ext}`
  const filePath = path.join(UPLOAD_DIR, fileName)
  await writeFile(filePath, buffer)
  return { filePath, fileName }
}

export async function cleanupFile(filePath: string): Promise<void> {
  try { await unlink(filePath) } catch { /* silent */ }
}

/**
 * Schedule a file for deletion after `delayMs` milliseconds.
 */
export function scheduleCleanup(filePath: string, delayMs = 5 * 60 * 1000): void {
  setTimeout(() => cleanupFile(filePath), delayMs)
}

// ── Image service ────────────────────────────────────────

/**
 * Compress an image buffer.
 */
export async function compressImage(
  buffer: Buffer,
  originalSize: number,
  options: { quality?: number; format?: string } = {}
): Promise<CompressResult> {
  const { quality = 80, format } = options

  let pipeline = sharp(buffer)
  const meta   = await pipeline.metadata()
  const ext    = (format || meta.format || 'jpeg').replace('jpg','jpeg')

  switch (ext.toLowerCase()) {
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality, mozjpeg: true }); break
    case 'png':
      pipeline = pipeline.png({ quality, compressionLevel: 9 }); break
    case 'webp':
      pipeline = pipeline.webp({ quality }); break
    case 'avif':
      pipeline = pipeline.avif({ quality }); break
    default:
      pipeline = pipeline.jpeg({ quality })
  }

  const outputBuffer  = await pipeline.toBuffer()
  const outputExt     = ext === 'jpeg' ? 'jpg' : ext
  const { filePath, fileName } = await saveBuffer(outputBuffer, outputExt)
  const compressedSize = outputBuffer.byteLength
  const savingsPct     = Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))

  return {
    outputPath:     filePath,
    outputFileName: fileName,
    downloadUrl:    `/uploads/${fileName}`,
    originalSize,
    compressedSize,
    savingsPct,
  }
}

/**
 * Convert an image buffer to a different format.
 */
export async function convertImage(
  buffer: Buffer,
  targetFormat: string
): Promise<ConvertResult> {
  const SUPPORTED = ['jpeg','jpg','png','webp','avif','gif','tiff']
  const fmt = targetFormat.toLowerCase()

  if (!SUPPORTED.includes(fmt)) {
    throw new Error(`Unsupported format: ${targetFormat}`)
  }

  const normalised = fmt === 'jpg' ? 'jpeg' : fmt
  const outputExt  = fmt === 'jpeg' ? 'jpg' : fmt

  const outputBuffer = await (sharp(buffer) as any)[normalised]().toBuffer()
  const { filePath, fileName } = await saveBuffer(outputBuffer, outputExt)

  return {
    outputPath:     filePath,
    outputFileName: fileName,
    downloadUrl:    `/uploads/${fileName}`,
  }
}

/**
 * Get image metadata.
 */
export async function getImageMetadata(buffer: Buffer) {
  return sharp(buffer).metadata()
}
