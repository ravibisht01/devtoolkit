import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import DiffCheckerTool from './DiffCheckerTool'

const TOOL = getToolById('diff-checker')!

export const metadata: Metadata = {
  title: 'Diff Checker — Compare Text',
  description: 'Compare two texts side by side with line-by-line difference highlighting.',
  keywords: ['diff checker','compare text','text diff'],
  alternates: { canonical: `https://devtoolkit.app/tools/diff-checker` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <DiffCheckerTool />
    </ToolPageShell>
  )
}
