import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AllToolsClient from './AllToolsClient'

export const metadata: Metadata = {
  title: 'All Developer Tools',
  description: 'Browse all 19+ free online developer tools — JSON, encoding, generators, code formatters, image tools and more.',
  alternates: { canonical: 'https://devtoolkit.app/tools' },
}

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <AllToolsClient />
      </main>
      <Footer />
    </>
  )
}
