'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Upload, Download, RefreshCw } from 'lucide-react'

const FORMATS = ['jpeg','png','webp','avif','gif'] as const
type Format = typeof FORMATS[number]

export default function ImageConverterTool() {
  const [file,          setFile]          = useState<File | null>(null)
  const [preview,       setPreview]       = useState<string | null>(null)
  const [targetFormat,  setTargetFormat]  = useState<Format>('webp')
  const [loading,       setLoading]       = useState(false)
  const [result,        setResult]        = useState<{ downloadUrl: string; fileName: string } | null>(null)

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0]
    if (!f) return
    setFile(f); setPreview(URL.createObjectURL(f)); setResult(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg','.jpeg','.png','.webp','.avif','.gif'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: () => toast.error('Max 10 MB, images only.'),
  })

  const handleConvert = async () => {
    if (!file) return toast.error('Upload an image first')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('targetFormat', targetFormat)

      const res = await fetch('/api/images/convert', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Conversion failed')
      }
      const data = await res.json()
      setResult(data.data)
      toast.success(`Converted to ${targetFormat.toUpperCase()}!`)
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

  // Detect current format from file
  const currentFormat = file?.type.replace('image/','').replace('jpeg','jpg') ?? null

  return (
    <div className="card p-6 flex flex-col gap-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`p-8 text-center cursor-pointer border-2 border-dashed rounded-xl transition-all ${
          isDragActive ? 'border-brand-500 bg-brand-500/5' : 'border-surface-border hover:border-brand-500/40'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div>
            <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain mb-3" />
            <p className="text-xs text-slate-500 mb-1">{file?.name}</p>
            {currentFormat && (
              <span className="badge bg-slate-500/10 text-slate-400 border border-slate-500/20 uppercase">
                Current: {currentFormat}
              </span>
            )}
            <br/>
            <button onClick={e => { e.stopPropagation(); reset() }} className="btn-ghost text-xs mt-2">Remove</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-brand-400 opacity-60" />
            <p className="text-sm text-slate-400">
              {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-xs text-slate-600">JPG, PNG, WebP, AVIF, GIF — max 10 MB</p>
          </div>
        )}
      </div>

      {/* Format picker */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
          Convert To
        </label>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map(f => (
            <button key={f} onClick={() => setTargetFormat(f)}
              className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
                targetFormat === f
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-400'
                  : 'border-surface-border text-slate-500 hover:text-white'
              }`}>
              .{f}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {targetFormat === 'webp' && '✦ WebP offers the best compression for web images'}
          {targetFormat === 'avif' && '✦ AVIF is next-gen format with superior compression'}
          {targetFormat === 'png'  && '✦ PNG is lossless and supports transparency'}
          {targetFormat === 'jpeg' && '✦ JPEG is widely supported for photos'}
          {targetFormat === 'gif'  && '✦ GIF supports animations and limited colors'}
        </p>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="btn-primary"
        >
          {loading
            ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting…</>
            : `Convert to ${targetFormat.toUpperCase()}`
          }
        </button>

        {result && (
          <button onClick={handleDownload} className="btn-secondary">
            <Download className="w-4 h-4" /> Download {targetFormat.toUpperCase()}
          </button>
        )}
      </div>

      {/* Success state */}
      {result && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
          <span className="text-green-400 text-lg">✓</span>
          <div>
            <p className="text-sm font-medium text-green-400">Conversion successful</p>
            <p className="text-xs text-green-500/70">{result.fileName}</p>
          </div>
        </div>
      )}
    </div>
  )
}
