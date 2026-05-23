import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import SqlFormatterTool from './SqlFormatterTool'

const TOOL = getToolById('sql-formatter')!

export const metadata: Metadata = {
  title: 'SQL Formatter Online',
  description: 'Format and beautify SQL queries for better readability. Free online SQL formatter.',
  keywords: ['sql formatter','format sql','sql beautifier'],
  alternates: { canonical: `https://devtoolkit.app/tools/sql-formatter` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <SqlFormatterTool />
    </ToolPageShell>
  )
}
