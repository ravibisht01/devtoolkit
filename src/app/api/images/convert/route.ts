import { NextRequest } from 'next/server'
import { convertImage, scheduleCleanup } from '@/lib/imageService'
import { parseFormData, validateImageFile, ok, err, rateLimit, getClientIp } from '@/lib/apiHelpers'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!rateLimit(ip, 20, 60_000)) {
    return err('Too many requests. Please wait a moment.', 429)
  }

  try {
    const { fields, file } = await parseFormData(req)

    const validationError = validateImageFile(file)
    if (validationError) return err(validationError)

    const targetFormat = fields.targetFormat
    if (!targetFormat) return err('targetFormat is required')

    const result = await convertImage(file!.buffer, targetFormat)
    scheduleCleanup(result.outputPath)

    return ok({
      downloadUrl: result.downloadUrl,
      fileName:    result.outputFileName,
    })
  } catch (e: any) {
    console.error('[/api/images/convert]', e)
    return err(e.message || 'Conversion failed', 500)
  }
}
