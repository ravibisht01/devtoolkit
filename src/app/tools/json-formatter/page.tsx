import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import JsonFormatterTool from './JsonFormatterTool'

const TOOL = getToolById('json-formatter')!

export const metadata: Metadata = {
  title: 'JSON Formatter & Beautifier',
  description: 'Format, beautify and validate JSON online. Free JSON formatter with syntax highlighting, minification, and file upload.',
  keywords: ['json formatter','json beautifier','format json','json validator'],
  alternates: { canonical: `https://devtoolkit.app/tools/json-formatter` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <JsonFormatterTool />
    </ToolPageShell>
  )
}
