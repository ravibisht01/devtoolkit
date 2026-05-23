import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import UuidGeneratorTool from './UuidGeneratorTool'

const TOOL = getToolById('uuid-generator')!

export const metadata: Metadata = {
  title: 'UUID Generator — v1 & v4',
  description: 'Generate cryptographically secure UUIDs v1 and v4 in bulk. Free online UUID generator.',
  keywords: ['uuid generator','guid generator','generate uuid'],
  alternates: { canonical: `https://devtoolkit.app/tools/uuid-generator` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <UuidGeneratorTool />
    </ToolPageShell>
  )
}
