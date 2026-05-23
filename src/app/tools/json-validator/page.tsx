import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import JsonValidatorTool from './JsonValidatorTool'

const TOOL = getToolById('json-validator')!

export const metadata: Metadata = {
  title: 'JSON Validator',
  description: 'Validate JSON syntax online. Free JSON validator with detailed error messages and line numbers.',
  keywords: ['json validator','validate json','json lint'],
  alternates: { canonical: `https://devtoolkit.app/tools/json-validator` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <JsonValidatorTool />
    </ToolPageShell>
  )
}
