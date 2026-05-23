import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import Base64Tool from './Base64Tool'

const TOOL = getToolById('base64')!

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder',
  description: 'Encode text to Base64 or decode Base64 strings instantly. Free online Base64 encoder decoder.',
  keywords: ['base64 encoder','base64 decoder','base64 online'],
  alternates: { canonical: `https://devtoolkit.app/tools/base64` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <Base64Tool />
    </ToolPageShell>
  )
}
