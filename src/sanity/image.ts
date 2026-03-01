import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

/** Optimized image URL for cards/thumbnails: WebP/AVIF, 75% quality, 500px width */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/** Optimized URL for above-the-fold images (LCP candidates): next-gen format, quality, dimensions */
export function urlForOptimized(
  source: SanityImageSource,
  options?: { width?: number; quality?: number }
) {
  const { width = 600, quality = 80 } = options ?? {}
  return builder
    .image(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .url()
}
