import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import RegexTesterTool from './RegexTesterTool'

const TOOL = getToolById('regex-tester')!

export const metadata: Metadata = {
  title: 'Regex Tester & Debugger',
  description: 'Test and debug regular expressions with live highlighting, flags, and match group extraction. Free online regex tester.',
  keywords: ['regex tester','regular expression','regexp online'],
  alternates: { canonical: `https://devtoolkit.app/tools/regex-tester` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <RegexTesterTool />
    </ToolPageShell>
  )
}
