import { MetadataRoute } from 'next'
import { TOOLS } from '@/constants/tools'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devtoolkit.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = TOOLS.map(tool => ({
    url:              `${SITE_URL}${tool.slug}`,
    lastModified:     new Date(),
    changeFrequency:  'monthly' as const,
    priority:         tool.popular ? 0.9 : 0.7,
  }))

  return [
    {
      url:             SITE_URL,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        1,
    },
    {
      url:             `${SITE_URL}/tools`,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    ...toolPages,
  ]
}
