import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToolCard from '@/components/common/ToolCard'
import { getPopularTools } from '@/constants/tools'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  const popular = getPopularTools(4)

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="font-mono text-7xl font-bold text-brand-500/20 mb-4">404</p>
          <h1 className="font-display text-3xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-slate-500 mb-8">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/"      className="btn-primary">← Go Home</Link>
            <Link href="/tools" className="btn-secondary">Browse Tools</Link>
          </div>

          <div className="mt-16">
            <h2 className="text-slate-500 text-sm uppercase tracking-wider mb-6">Popular Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popular.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
