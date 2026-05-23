'use client'

import { useState, useMemo } from 'react'
import ToolToolbar from '@/components/common/ToolToolbar'
import { AlertCircle } from 'lucide-react'

const ALL_FLAGS = ['g', 'i', 'm', 's', 'u'] as const
const FLAG_DESC: Record<string, string> = { g: 'Global', i: 'Ignore case', m: 'Multiline', s: 'Dotall', u: 'Unicode' }

export default function RegexTesterTool() {
  const [pattern,     setPattern]     = useState('(\\w+)@([\\w.-]+\\.\\w+)')
  const [activeFlags, setActiveFlags] = useState<string[]>(['g', 'i'])
  const [testStr,     setTestStr]     = useState(
    `Contact: hello@devtoolkit.app\nSupport: support@example.com\nInvalid: not-an-email`
  )

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: '', highlighted: testStr }
    try {
      const flags   = activeFlags.join('')
      const flagsG  = flags.includes('g') ? flags : flags + 'g'
      const re      = new RegExp(pattern, flagsG)
      const matches: { index: number; match: string; groups: string[] }[] = []
      let m: RegExpExecArray | null
      while ((m = re.exec(testStr)) !== null) {
        matches.push({ index: m.index, match: m[0], groups: m.slice(1) })
        if (!activeFlags.includes('g')) break
      }
      const highlighted = testStr.replace(
        new RegExp(pattern, flagsG),
        s => `<mark class="bg-brand-500/30 text-brand-200 rounded px-0.5">${s}</mark>`
      )
      return { matches, error: '', highlighted }
    } catch (e: any) {
      return { matches: [], error: e.message, highlighted: testStr }
    }
  }, [pattern, activeFlags, testStr])

  const toggleFlag = (f: string) =>
    setActiveFlags(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <div className="card p-4">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Pattern</label>
          <div className="flex items-center gap-2 bg-surface border border-surface-border rounded-lg px-3 py-2 focus-within:border-brand-500/60 focus-within:ring-1 focus-within:ring-brand-500/30 transition-all">
            <span className="text-slate-600 font-mono">/</span>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
              placeholder="Enter regex pattern…"
              className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none" spellCheck={false} />
            <span className="text-slate-600 font-mono">/{activeFlags.join('')}</span>
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />{error}
            </div>
          )}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-slate-500">Flags:</span>
            {ALL_FLAGS.map(f => (
              <button key={f} onClick={() => toggleFlag(f)} title={FLAG_DESC[f]}
                className={`px-2 py-0.5 rounded text-xs font-mono border transition-all ${
                  activeFlags.includes(f) ? 'bg-brand-500/20 border-brand-500/40 text-brand-400' : 'border-surface-border text-slate-600 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="card p-4 flex-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Test String</label>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)} rows={8}
            className="input-base resize-none font-mono text-xs leading-relaxed" />
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4">
        <div className="card p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matches</span>
            <span className={`text-xs font-medium ${matches.length ? 'text-green-400' : 'text-slate-500'}`}>
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </span>
          </div>
          <div className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap bg-surface rounded-lg p-3 min-h-[120px]"
            dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-slate-600">No matches</span>' }} />
        </div>

        {matches.length > 0 && (
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Match Details</span>
              <ToolToolbar copyValue={matches.map(m => m.match).join('\n')} />
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 flex-shrink-0">#{i + 1}</span>
                  <div>
                    <span className="font-mono text-white">{m.match}</span>
                    <span className="text-slate-600 ml-2">@{m.index}</span>
                    {m.groups.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            Group {gi + 1}: {g}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
