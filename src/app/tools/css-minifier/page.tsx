import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import CssMinifierTool from './CssMinifierTool'

const TOOL = getToolById('css-minifier')!

export const metadata: Metadata = {
  title: 'CSS Minifier Online',
  description: 'Minify CSS to reduce file size. Remove comments and whitespace.',
  keywords: ['css minifier','minify css','css compressor'],
  alternates: { canonical: `https://devtoolkit.app/tools/css-minifier` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <CssMinifierTool />
    </ToolPageShell>
  )
}
