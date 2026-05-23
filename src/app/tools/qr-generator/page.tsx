import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import QrGeneratorTool from './QrGeneratorTool'

const TOOL = getToolById('qr-generator')!

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Generate custom QR codes for URLs and text. Download as PNG with custom colors.',
  keywords: ['qr code generator','qr code maker','create qr code'],
  alternates: { canonical: `https://devtoolkit.app/tools/qr-generator` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <QrGeneratorTool />
    </ToolPageShell>
  )
}
