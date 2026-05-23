'use client'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import toast from 'react-hot-toast'
import { Download } from 'lucide-react'

export default function QrGeneratorTool() {
  const [text,        setText]        = useState('https://devtoolkit.app')
  const [size,        setSize]        = useState(256)
  const [errorLevel,  setErrorLevel]  = useState<'L'|'M'|'Q'|'H'>('M')
  const [darkColor,   setDarkColor]   = useState('#0ea5e9')
  const [lightColor,  setLightColor]  = useState('#0f1117')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, text, {
      width: size, margin: 2, errorCorrectionLevel: errorLevel,
      color: { dark: darkColor, light: lightColor },
    }).catch(() => {})
  }, [text, size, errorLevel, darkColor, lightColor])

  const handleDownload = () => {
    if (!canvasRef.current) return
    const a = document.createElement('a')
    a.download = 'qrcode.png'
    a.href = canvasRef.current.toDataURL()
    a.click()
    toast.success('QR Code downloaded!')
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-6 flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Content</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter URL or text…" rows={3} className="input-base resize-none"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Size: {size}px</label>
            <input type="range" min={128} max={512} step={32} value={size} onChange={e => setSize(+e.target.value)} className="w-full accent-brand-500"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Error Correction</label>
            <div className="flex gap-1">
              {(['L','M','Q','H'] as const).map(l => (
                <button key={l} onClick={() => setErrorLevel(l)}
                  className={`flex-1 py-1.5 text-xs font-mono border rounded transition-all ${errorLevel===l?'bg-brand-500/20 border-brand-500/40 text-brand-400':'border-surface-border text-slate-500 hover:text-white'}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['Foreground', darkColor, setDarkColor], ['Background', lightColor, setLightColor]].map(([label, val, setter]) => (
            <div key={label as string}>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">{label as string}</label>
              <div className="flex items-center gap-2">
                <input type="color" value={val as string} onChange={e => (setter as (v:string)=>void)(e.target.value)}
                  className="w-10 h-8 rounded border border-surface-border bg-surface cursor-pointer"/>
                <code className="text-xs text-slate-400">{val as string}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6 flex flex-col items-center gap-4">
        <div className="rounded-xl overflow-hidden border border-surface-border">
          <canvas ref={canvasRef}/>
        </div>
        <button onClick={handleDownload} className="btn-primary">
          <Download className="w-4 h-4"/> Download PNG
        </button>
      </div>
    </div>
  )
}
