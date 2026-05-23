import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { DM_Sans, JetBrains_Mono, Syne } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

// ── Fonts ──────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

// ── Site-wide metadata ─────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devtoolkit.app'),
  title: {
    default:  'DevToolkit — Free Online Developer Tools',
    template: '%s | DevToolkit',
  },
  description:
    'Free online developer tools: JSON formatter, Regex tester, Base64 encoder, JWT decoder, UUID generator, Password generator, QR code maker and 15+ more — no sign-up required.',
  keywords: ['developer tools', 'json formatter', 'regex tester', 'base64', 'jwt decoder', 'uuid generator', 'online tools'],
  authors:  [{ name: 'DevToolkit' }],
  creator:  'DevToolkit',
  verification: {
    google: "UVvO1McbSvJZqZAv79iD48-RF28LxhvpgFkV5KiIEuI",
  },
  robots:   { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type:        'website',
    siteName:    'DevToolkit',
    title:       'DevToolkit — Free Online Developer Tools',
    description: 'Free, fast, privacy-first developer utilities. No login required.',
    images:      [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'DevToolkit — Free Online Developer Tools',
    description: 'Free, fast, privacy-first developer utilities.',
    images:      ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1117',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6899244710955145"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#161b27',
              color: '#e2e8f0',
              border: '1px solid #1e2535',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#4ade80', secondary: '#161b27' } },
            error:   { iconTheme: { primary: '#f87171', secondary: '#161b27' } },
          }}
        />
      </body>
    </html>
  )
}
