import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import JwtDecoderTool from './JwtDecoderTool'

const TOOL = getToolById('jwt-decoder')!

export const metadata: Metadata = {
  title: 'JWT Decoder & Inspector',
  description: 'Decode and inspect JWT tokens — header, payload, signature and expiry. Free JWT decoder online.',
  keywords: ['jwt decoder','json web token','jwt inspector'],
  alternates: { canonical: `https://devtoolkit.app/tools/jwt-decoder` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <JwtDecoderTool />
    </ToolPageShell>
  )
}
