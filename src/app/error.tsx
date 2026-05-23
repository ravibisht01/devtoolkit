'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="max-w-md text-center px-4">
        <p className="font-mono text-5xl font-bold text-red-500/20 mb-4">Error</p>
        <h2 className="font-display text-2xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-slate-500 text-sm mb-8">{error.message || 'An unexpected error occurred.'}</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-secondary">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
