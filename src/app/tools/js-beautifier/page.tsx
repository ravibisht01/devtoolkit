import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import JsBeautifierTool from './JsBeautifierTool'

const TOOL = getToolById('js-beautifier')!

export const metadata: Metadata = {
  title: 'JavaScript Beautifier',
  description: 'Beautify and format minified JavaScript code. Free JS formatter with Monaco editor.',
  keywords: ['javascript beautifier','js formatter','format javascript'],
  alternates: { canonical: `https://devtoolkit.app/tools/js-beautifier` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <JsBeautifierTool />
    </ToolPageShell>
  )
}
