'use client'

import { useState } from 'react'
import { Copy, RotateCcw, Download, Share2, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  onReset?:         () => void
  onDownload?:      () => void
  onShare?:         () => void
  copyValue?:       string
  downloadFileName?:string
  downloadContent?: string
  downloadMime?:    string
  extra?:           React.ReactNode
}

export default function ToolToolbar({
  onReset, onDownload, onShare,
  copyValue, downloadFileName, downloadContent, downloadMime = 'text/plain', extra,
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const val = copyValue
    if (!val) return
    try {
      await navigator.clipboard.writeText(val)
      setCopied(true)
      toast.success('Copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch { toast.error('Copy failed') }
  }

  const handleDownload = () => {
    if (onDownload) return onDownload()
    if (!downloadContent) return
    const blob = new Blob([downloadContent], { type: downloadMime })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), { href: url, download: downloadFileName || 'download.txt' })
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }

  const handleShare = async () => {
    if (onShare) return onShare()
    try { await navigator.share({ url: window.location.href }) }
    catch { await navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {extra}
      <button onClick={handleCopy} className="btn-secondary text-xs px-3 py-1.5">
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {(downloadContent || onDownload) && (
        <button onClick={handleDownload} className="btn-secondary text-xs px-3 py-1.5">
          <Download className="w-3.5 h-3.5" /> Download
        </button>
      )}
      <button onClick={handleShare} className="btn-secondary text-xs px-3 py-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share
      </button>
      {onReset && (
        <button onClick={onReset} className="btn-ghost text-xs px-3 py-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      )}
    </div>
  )
}
