import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import TimestampTool from './TimestampTool'

const TOOL = getToolById('timestamp-converter')!

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter',
  description: 'Convert Unix timestamps to human-readable dates and back. Supports milliseconds and seconds.',
  keywords: ['timestamp converter','unix timestamp','epoch converter'],
  alternates: { canonical: `https://devtoolkit.app/tools/timestamp-converter` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <TimestampTool />
    </ToolPageShell>
  )
}
