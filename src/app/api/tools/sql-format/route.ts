import { NextRequest } from 'next/server'
import { ok, err, rateLimit, getClientIp } from '@/lib/apiHelpers'

export const runtime = 'nodejs'

const KEYWORDS = [
  'SELECT','FROM','WHERE','LEFT JOIN','RIGHT JOIN','INNER JOIN','FULL OUTER JOIN',
  'JOIN','ON','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET',
  'INSERT INTO','VALUES','UPDATE','SET','DELETE FROM',
  'CREATE TABLE','ALTER TABLE','DROP TABLE',
  'UNION ALL','UNION','AND','OR','AS','DISTINCT',
]

function formatSql(sql: string): string {
  let out = sql.trim()
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length)
  sorted.forEach(kw => {
    const re = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi')
    out = out.replace(re, `\n${kw}`)
  })
  out = out.replace(/\n(AND|OR)\b/g, '\n  $1')
  out = out.replace(/\n(ON)\b/g, '\n  $1')
  out = out.replace(/\n{3,}/g, '\n\n').trim()
  return out
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!rateLimit(ip, 60, 60_000)) {
    return err('Too many requests.', 429)
  }

  try {
    const body = await req.json()
    const { sql } = body

    if (!sql || typeof sql !== 'string') {
      return err('sql field is required and must be a string')
    }

    if (sql.length > 100_000) {
      return err('SQL too long (max 100,000 characters)')
    }

    return ok({ formatted: formatSql(sql) })
  } catch (e: any) {
    return err(e.message || 'Formatting failed', 500)
  }
}
