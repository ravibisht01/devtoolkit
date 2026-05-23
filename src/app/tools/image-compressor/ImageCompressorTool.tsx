'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Upload, Download, Image as ImgIcon, TrendingDown } from 'lucide-react'

function formatBytes(bytes: number) {
  if (!bytes) return '0 B'
  const k = 1024, sizes = ['B','KB','MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k,i)).toFixed(1))} ${sizes[i]}`
}

export default function ImageCompressorTool() {
  const [file,     setFile]     = useState<File | null>(null)
  const [preview,  setPreview]  = useState<string | null>(null)
  const [quality,  setQuality]  = useState(80)
  const [format,   setFormat]   = useState('same')
  const [loading,  setLoading]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [result,   setResult]   = useState<{
    downloadUrl: string; originalSize: number; compressedSize: number; savingsPct: number; fileName: string
  } | null>(null)

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0]
    if (!f) return
    setFile(f)
    setResult(null)
    setPreview(URL.createObjectURL(f))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg','.jpeg','.png','.webp','.avif'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: () => toast.error('Max 10 MB, images only.'),
  })

  const handleCompress = async () => {
    if (!file) return toast.error('Upload an image first')
    setLoading(true)
    setProgress(0)

    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('quality', String(quality))
      if (format !== 'same') fd.append('format', format)

      const res = await fetch('/api/images/compress', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Compression failed')
      }
      const data = await res.json()
      setResult(data.data)
      toast.success(`Saved ${data.data.savingsPct}%!`)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.downloadUrl
    a.download = result.fileName
    a.click()
  }

  const reset = () => { setFile(null); setPreview(null); setResult(null) }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left — upload + settings */}
      <div className="flex flex-col gap-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`card p-8 text-center cursor-pointer transition-all border-2 border-dashed ${
            isDragActive
              ? 'border-brand-500 bg-brand-500/5'
              : 'border-surface-border hover:border-brand-500/40'
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div>
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain mb-3" />
              <p className="text-xs text-slate-500 mb-2">{file?.name} — {formatBytes(file?.size ?? 0)}</p>
              <button
                onClick={e => { e.stopPropagation(); reset() }}
                className="btn-ghost text-xs"
              >Remove</button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-brand-400" />
              </div>
              <p className="text-sm text-slate-300">
                {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-slate-600">JPG, PNG, WebP, AVIF — max 10 MB</p>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="card p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Quality: <span className="text-brand-400">{quality}%</span>
            </label>
            <input type="range" min={10} max={100} value={quality}
              onChange={e => setQuality(+e.target.value)} className="w-full accent-brand-500" />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>Smaller file</span><span>Better quality</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Output Format
            </label>
            <div className="flex flex-wrap gap-2">
              {['same','jpeg','png','webp','avif'].map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                    format === f
                      ? 'bg-brand-500/20 border-brand-500/40 text-brand-400'
                      : 'border-surface-border text-slate-500 hover:text-white'
                  }`}>
                  {f === 'same' ? 'Keep original' : f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Compressing…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 transition-all duration-200 rounded-full"
                  style={{ width: `${progress || 50}%` }} />
              </div>
            </div>
          )}

          <button
            onClick={handleCompress}
            disabled={!file || loading}
            className="btn-primary"
          >
            {loading ? 'Compressing…' : '🗜 Compress Image'}
          </button>
        </div>
      </div>

      {/* Right — result */}
      <div className="card p-6 flex flex-col">
        {result ? (
          <>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Result</h3>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Original',   value: formatBytes(result.originalSize),   highlight: false },
                { label: 'Compressed', value: formatBytes(result.compressedSize), highlight: false },
                { label: 'Savings',    value: `${result.savingsPct}%`,            highlight: true  },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="text-center bg-surface rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className={`text-sm font-bold ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Visual bar comparison */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-20 text-right">Original</span>
                <div className="flex-1 h-2 bg-surface rounded-full">
                  <div className="h-full bg-slate-600 rounded-full w-full" />
                </div>
                <span className="w-16">{formatBytes(result.originalSize)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-20 text-right">Compressed</span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full transition-all"
                    style={{ width: `${100 - result.savingsPct}%` }} />
                </div>
                <span className="w-16">{formatBytes(result.compressedSize)}</span>
              </div>
            </div>

            <button onClick={handleDownload} className="btn-primary mt-auto">
              <Download className="w-4 h-4" /> Download Compressed Image
            </button>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-4">
            <div className="relative">
              <ImgIcon className="w-14 h-14 opacity-10" />
              <TrendingDown className="w-6 h-6 text-brand-500/40 absolute -bottom-1 -right-1" />
            </div>
            <div className="text-center">
              <p className="text-sm mb-1">Compression result will appear here</p>
              <p className="text-xs text-slate-700">Upload an image and click compress</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
