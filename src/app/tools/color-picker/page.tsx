import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import ColorPickerTool from './ColorPickerTool'

const TOOL = getToolById('color-picker')!

export const metadata: Metadata = {
  title: 'Color Picker & Converter',
  description: 'Pick colors and convert between HEX, RGB and HSL. Generate shade palettes.',
  keywords: ['color picker','hex to rgb','rgb to hsl','color converter'],
  alternates: { canonical: `https://devtoolkit.app/tools/color-picker` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <ColorPickerTool />
    </ToolPageShell>
  )
}
