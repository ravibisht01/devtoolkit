import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import PasswordGeneratorTool from './PasswordGeneratorTool'

const TOOL = getToolById('password-generator')!

export const metadata: Metadata = {
  title: 'Secure Password Generator',
  description: 'Generate strong secure passwords with customizable length and character sets using Web Crypto API.',
  keywords: ['password generator','secure password','random password'],
  alternates: { canonical: `https://devtoolkit.app/tools/password-generator` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <PasswordGeneratorTool />
    </ToolPageShell>
  )
}
