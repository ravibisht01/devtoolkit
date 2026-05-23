import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import UrlEncoderTool from './UrlEncoderTool'

const TOOL = getToolById('url-encoder')!

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder',
  description: 'Encode or decode URL components and query strings. Free online URL encoder decoder.',
  keywords: ['url encoder','url decoder','percent encoding'],
  alternates: { canonical: `https://devtoolkit.app/tools/url-encoder` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <UrlEncoderTool />
    </ToolPageShell>
  )
}
