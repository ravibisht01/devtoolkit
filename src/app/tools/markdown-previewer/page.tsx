import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import MarkdownPreviewerTool from './MarkdownPreviewerTool'

const TOOL = getToolById('markdown-previewer')!

export const metadata: Metadata = {
  title: 'Markdown Previewer',
  description: 'Write Markdown and see a live rendered preview. Free online Markdown editor.',
  keywords: ['markdown previewer','markdown editor','live markdown'],
  alternates: { canonical: `https://devtoolkit.app/tools/markdown-previewer` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <MarkdownPreviewerTool />
    </ToolPageShell>
  )
}
