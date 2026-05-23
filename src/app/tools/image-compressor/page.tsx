import type { Metadata } from 'next'
import { getToolById } from '@/constants/tools'
import ToolPageShell from '@/components/common/ToolPageShell'
import ImageCompressorTool from './ImageCompressorTool'

const TOOL = getToolById('image-compressor')!

export const metadata: Metadata = {
  title: 'Image Compressor Online',
  description: 'Compress JPG PNG and WebP images without losing quality. Free online image compressor.',
  keywords: ['image compressor','compress jpg','compress png','webp compression'],
  alternates: { canonical: `https://devtoolkit.app/tools/image-compressor` },
}

export default function Page() {
  return (
    <ToolPageShell tool={TOOL}>
      <ImageCompressorTool />
    </ToolPageShell>
  )
}
