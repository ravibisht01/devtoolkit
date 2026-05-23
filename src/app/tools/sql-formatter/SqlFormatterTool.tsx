'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'

const SAMPLE = `SELECT u.id, u.name, u.email, o.total, o.status FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2024-01-01' AND o.status = 'completed' ORDER BY o.total DESC LIMIT 50`

const KEYWORDS = [
  'SELECT','FROM','WHERE','LEFT JOIN','RIGHT JOIN','INNER JOIN','FULL OUTER JOIN',
  'JOIN','ON','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET',
  'INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE',
  'ALTER TABLE','DROP TABLE','UNION','UNION ALL','AS','DISTINCT','NOT','IN','LIKE',
  'BETWEEN','IS NULL','IS NOT NULL','COUNT','SUM','AVG','MIN','MAX',
]

function formatSql(sql: string): string {
  let out = sql.trim()
  // Sort by length descending so compound keywords (LEFT JOIN) match before (JOIN)
  const sorted = [...KEYWORDS].sort((a,b) => b.length - a.length)
  sorted.forEach(kw => {
    const re = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi')
    out = out.replace(re, `\n${kw}`)
  })
  // Indent ON/AND/OR that follow JOIN/WHERE
  out = out.replace(/\n(AND|OR)\b/g, '\n  $1')
  out = out.replace(/\n(ON)\b/g, '\n  $1')
  // Clean up multiple blank lines
  out = out.replace(/\n{3,}/g, '\n\n').trim()
  return out
}

export default function SqlFormatterTool() {
  const [input,   setInput]   = useState(SAMPLE)
  const [output,  setOutput]  = useState('')
  const [dialect, setDialect] = useState('Generic SQL')

  const format = () => {
    if (!input.trim()) return toast.error('Enter SQL first')
    setOutput(formatSql(input))
    toast.success('SQL formatted!')
  }

  return (
    <div className="card p-6 flex flex-col gap-4">
      {/* Dialect picker */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-500">Dialect:</span>
        {['Generic SQL','PostgreSQL','MySQL','SQLite','MSSQL'].map(d => (
          <button key={d} onClick={() => setDialect(d)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              dialect === d ? 'bg-brand-500/20 border-brand-500/40 text-brand-400' : 'border-surface-border text-slate-500 hover:text-white'
            }`}>{d}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SQL Input</label>
            <span className="text-xs text-slate-600">{input.length} chars</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12}
            className="input-base font-mono text-sm resize-none" placeholder="Paste SQL here…" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Formatted SQL</label>
            {output && <ToolToolbar copyValue={output} downloadContent={output} downloadFileName="query.sql" />}
          </div>
          <textarea value={output} readOnly rows={12}
            className="input-base font-mono text-sm resize-none bg-surface-card/50" placeholder="Formatted SQL appears here…" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={format} className="btn-primary">Format SQL</button>
        <button onClick={() => { setInput(''); setOutput('') }} className="btn-ghost">Reset</button>
      </div>
    </div>
  )
}
