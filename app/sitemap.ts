import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://datacube.immunecube.com',
      lastModified: new Date(),
    },
  ]
}
