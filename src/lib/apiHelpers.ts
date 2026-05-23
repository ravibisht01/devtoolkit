import { NextResponse } from 'next/server'

// ── Rate limiting (simple in-memory, per-IP) ─────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true   // allowed
  }

  if (entry.count >= max) return false  // blocked
  entry.count++
  return true
}

// ── Standard JSON responses ──────────────────────────────
export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status })
}

// ── Extract client IP ────────────────────────────────────
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

// ── Parse multipart form data ────────────────────────────
export async function parseFormData(req: Request): Promise<{
  fields: Record<string, string>
  file: { buffer: Buffer; originalName: string; mimeType: string; size: number } | null
}> {
  const formData = await req.formData()
  const fields: Record<string, string> = {}
  let file = null

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const arrayBuffer = await value.arrayBuffer()
      file = {
        buffer:       Buffer.from(arrayBuffer),
        originalName: value.name,
        mimeType:     value.type,
        size:         value.size,
      }
    } else {
      fields[key] = value
    }
  }

  return { fields, file }
}

// ── Validate image upload ────────────────────────────────
const ALLOWED_MIME = new Set([
  'image/jpeg','image/jpg','image/png','image/webp','image/avif','image/gif',
])
const MAX_SIZE = 10 * 1024 * 1024  // 10 MB

export function validateImageFile(file: { mimeType: string; size: number } | null): string | null {
  if (!file)                          return 'No image file provided'
  if (!ALLOWED_MIME.has(file.mimeType)) return `Unsupported file type: ${file.mimeType}`
  if (file.size > MAX_SIZE)           return 'File too large (max 10 MB)'
  return null
}
