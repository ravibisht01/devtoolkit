import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import ImageConverterTool from './ImageConverterTool'

const TOOL = getToolById('image-converter')!

export const metadata: Metadata = {
  title: 'Image Converter Online',
  description: 'Convert images between PNG JPG WebP AVIF formats. Free online image converter.',
  keywords: ['image converter','png to webp','jpg to png'],
  alternates: { canonical: `https://devtoolkit.app/tools/image-converter` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <ImageConverterTool />
    </ToolPageShell>
  )
}
