'use client'
import { useState, useMemo } from 'react'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'

const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

function JsonBlock({ data }: { data: object }) {
  return <pre className="text-xs font-mono text-slate-300 bg-surface rounded-lg p-4 overflow-auto leading-relaxed">{JSON.stringify(data, null, 2)}</pre>
}

export default function JwtDecoderTool() {
  const [token, setToken] = useState(SAMPLE)
  const decoded = useMemo(() => {
    if (!token.trim()) return null
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('JWT must have 3 parts')
      const decode = (s: string) => JSON.parse(atob(s.replace(/-/g,'+').replace(/_/g,'/')))
      const header = decode(parts[0]), payload = decode(parts[1])
      const now = Math.floor(Date.now()/1000)
      return { header, payload, signature: parts[2], expired: payload.exp ? payload.exp < now : false,
        expiresAt: payload.exp ? new Date(payload.exp*1000).toLocaleString() : null,
        issuedAt: payload.iat ? new Date(payload.iat*1000).toLocaleString() : null, error: null }
    } catch(e:any) { return { error: e.message } }
  }, [token])

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-4">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">JWT Token</label>
        <textarea value={token} onChange={e=>setToken(e.target.value)} rows={4} className="input-base font-mono text-xs resize-none break-all" placeholder="Paste JWT here…"/>
        <button onClick={()=>setToken('')} className="btn-ghost mt-2 text-xs">Clear</button>
      </div>
      {decoded?.error && (
        <div className="card p-4 flex items-center gap-3 text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0"/>
          <p className="text-sm">{decoded.error}</p>
        </div>
      )}
      {decoded && !decoded.error && (
        <div className="grid md:grid-cols-3 gap-4">
          {[['Header','rose-400',decoded.header],['Payload','brand-400',decoded.payload]].map(([label,color,data]) => (
            <div key={label as string} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full bg-${color}`}/>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label as string}</span>
              </div>
              <JsonBlock data={data as object}/>
              {label === 'Payload' && (
                <div className="mt-3 space-y-1.5">
                  {decoded.issuedAt && <div className="flex items-center gap-2 text-xs text-slate-500"><Clock className="w-3 h-3"/>Issued: {decoded.issuedAt}</div>}
                  {decoded.expiresAt && (
                    <div className={`flex items-center gap-2 text-xs ${decoded.expired?'text-red-400':'text-green-400'}`}>
                      {decoded.expired ? <><AlertCircle className="w-3 h-3"/>Expired: {decoded.expiresAt}</> : <><CheckCircle2 className="w-3 h-3"/>Expires: {decoded.expiresAt}</>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-purple-400"/><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signature</span></div>
            <p className="font-mono text-xs text-slate-500 break-all leading-relaxed">{decoded.signature}</p>
            <p className="text-xs text-slate-600 mt-3">⚠️ Signature not verified.</p>
          </div>
        </div>
      )}
    </div>
  )
}
