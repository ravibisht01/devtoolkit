import { NextRequest } from 'next/server'
import { compressImage, scheduleCleanup } from '@/lib/imageService'
import { parseFormData, validateImageFile, ok, err, rateLimit, getClientIp } from '@/lib/apiHelpers'

// Disable default body parser — we handle multipart manually
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Rate limit: 20 requests per minute per IP
  const ip = getClientIp(req)
  if (!rateLimit(ip, 20, 60_000)) {
    return err('Too many requests. Please wait a moment.', 429)
  }

  try {
    const { fields, file } = await parseFormData(req)

    const validationError = validateImageFile(file)
    if (validationError) return err(validationError)

    const quality = Math.min(100, Math.max(1, parseInt(fields.quality ?? '80') || 80))
    const format  = fields.format || undefined

    const result = await compressImage(file!.buffer, file!.size, { quality, format })

    // Auto-delete the compressed file after 5 minutes
    scheduleCleanup(result.outputPath)

    return ok({
      downloadUrl:     result.downloadUrl,
      originalSize:    result.originalSize,
      compressedSize:  result.compressedSize,
      savingsPct:      result.savingsPct,
      fileName:        result.outputFileName,
    })
  } catch (e: any) {
    console.error('[/api/images/compress]', e)
    return err(e.message || 'Compression failed', 500)
  }
}
