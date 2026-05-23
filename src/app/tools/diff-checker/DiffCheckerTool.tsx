'use client'
import { useState, useMemo } from 'react'

type DiffLine = { type: 'same'|'added'|'removed'|'changed'; left: string; right: string; n: number }

function computeDiff(a: string, b: string): DiffLine[] {
  const la = a.split('\n'), lb = b.split('\n')
  const max = Math.max(la.length, lb.length)
  return Array.from({ length: max }, (_, i) => {
    const l = la[i], r = lb[i]
    if (l === r)         return { type: 'same',    left: l ?? '', right: r ?? '', n: i+1 }
    if (l === undefined) return { type: 'added',   left: '',      right: r,       n: i+1 }
    if (r === undefined) return { type: 'removed', left: l,       right: '',      n: i+1 }
    return                      { type: 'changed', left: l,       right: r,       n: i+1 }
  })
}

const ROW_COLORS: Record<string, string> = {
  added:   'bg-green-500/5',
  removed: 'bg-red-500/5',
  changed: 'bg-yellow-500/5',
  same:    '',
}
const LEFT_COLORS: Record<string, string> = {
  removed: 'text-red-400',
  changed: 'text-red-400',
  same:    'text-slate-500',
  added:   'text-slate-600',
}
const RIGHT_COLORS: Record<string, string> = {
  added:   'text-green-400',
  changed: 'text-green-400',
  same:    'text-slate-500',
  removed: 'text-slate-600',
}

export default function DiffCheckerTool() {
  const [left,  setLeft]  = useState('Hello world\nThis is line 2\nSame line here\nOnly in original')
  const [right, setRight] = useState('Hello DevToolkit\nThis is line 2\nSame line here\nNew line added\nAnother new line')

  const diff    = useMemo(() => computeDiff(left, right), [left, right])
  const changes = diff.filter(d => d.type !== 'same').length

  return (
    <div className="flex flex-col gap-4">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        {([['Original', left, setLeft], ['Modified', right, setRight]] as const).map(([label, val, setter]) => (
          <div key={label} className="card overflow-hidden">
            <div className="px-4 py-2.5 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {label}
            </div>
            <textarea
              value={val}
              onChange={e => (setter as (v:string)=>void)(e.target.value)}
              rows={8}
              className="w-full bg-transparent text-sm font-mono text-slate-300 p-4 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        ))}
      </div>

      {/* Diff output */}
      <div className="card overflow-hidden">
        <div className="px-4 py-2.5 border-b border-surface-border flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Diff</span>
          <span className={`text-xs font-medium ${changes > 0 ? 'text-orange-400' : 'text-green-400'}`}>
            {changes === 0 ? 'No differences' : `${changes} change${changes !== 1 ? 's' : ''}`}
          </span>
        </div>
        <div className="overflow-auto max-h-96">
          {diff.map((d, i) => (
            <div key={i} className={`grid grid-cols-2 text-xs font-mono border-b border-surface-border/30 ${ROW_COLORS[d.type]}`}>
              <div className={`px-3 py-1.5 border-r border-surface-border/30 ${LEFT_COLORS[d.type]}`}>
                <span className="text-slate-700 mr-3 select-none w-6 inline-block text-right">{d.n}</span>
                {d.left}
              </div>
              <div className={`px-3 py-1.5 ${RIGHT_COLORS[d.type]}`}>
                {d.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
