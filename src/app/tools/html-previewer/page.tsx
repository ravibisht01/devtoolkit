import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import HtmlPreviewerTool from './HtmlPreviewerTool'

const TOOL = getToolById('html-previewer')!

export const metadata: Metadata = {
  title: 'HTML Previewer — Live Editor',
  description: 'Write and preview HTML, CSS and JavaScript live in the browser. Free online HTML editor.',
  keywords: ['html previewer','live html editor','html playground'],
  alternates: { canonical: `https://devtoolkit.app/tools/html-previewer` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <HtmlPreviewerTool />
    </ToolPageShell>
  )
}
