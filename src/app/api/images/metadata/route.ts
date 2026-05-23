import { NextRequest } from 'next/server'
import { getImageMetadata } from '@/lib/imageService'
import { parseFormData, validateImageFile, ok, err, rateLimit, getClientIp } from '@/lib/apiHelpers'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!rateLimit(ip, 30, 60_000)) {
    return err('Too many requests.', 429)
  }

  try {
    const { file } = await parseFormData(req)
    const validationError = validateImageFile(file)
    if (validationError) return err(validationError)

    const meta = await getImageMetadata(file!.buffer)
    return ok(meta)
  } catch (e: any) {
    console.error('[/api/images/metadata]', e)
    return err(e.message || 'Failed to read metadata', 500)
  }
}
