import type { Metadata } from 'next'
import HomePageClient from '@/components/common/HomePageClient'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Free Online Developer Tools',
  description:
    'DevToolkit — 19+ free online tools for developers. JSON formatter, Base64 encoder, JWT decoder, Regex tester, UUID generator, Password generator and more. No signup required.',
  keywords: ['developer tools', 'json formatter', 'base64', 'jwt decoder', 'regex tester', 'uuid generator'],
  alternates: { canonical: 'https://devtoolkit.app' },
  openGraph: {
    url: 'https://devtoolkit.app',
    title: 'DevToolkit — Free Online Developer Tools',
    description: 'Free, fast, privacy-first developer utilities. No login.',
  },
}

// Structured data — WebSite + SearchAction
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevToolkit',
  url: 'https://devtoolkit.app',
  description: 'Free online developer tools for JSON, encoding, generators and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://devtoolkit.app/tools?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <main className="pt-16">
        <HomePageClient />
      </main>
      <Footer />
    </>
  )
}
