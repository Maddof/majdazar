const STRAPI_BASE_URL =
  (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:1337'

function getMediaUrl(media: unknown): string | undefined {
  if (!media || typeof media !== 'object') {
    return undefined
  }

  const asAny = media as Record<string, unknown>

  const directUrl = asAny.url
  if (typeof directUrl === 'string') {
    return directUrl.startsWith('http')
      ? directUrl
      : `${STRAPI_BASE_URL}${directUrl}`
  }

  const nestedData = asAny.data
  if (!nestedData || typeof nestedData !== 'object') {
    return undefined
  }

  const nestedAsAny = nestedData as Record<string, unknown>
  const nestedUrl = nestedAsAny.url
  if (typeof nestedUrl === 'string') {
    return nestedUrl.startsWith('http')
      ? nestedUrl
      : `${STRAPI_BASE_URL}${nestedUrl}`
  }

  const attrs = nestedAsAny.attributes
  if (!attrs || typeof attrs !== 'object') {
    return undefined
  }

  const attrsUrl = (attrs as Record<string, unknown>).url
  if (typeof attrsUrl === 'string') {
    return attrsUrl.startsWith('http')
      ? attrsUrl
      : `${STRAPI_BASE_URL}${attrsUrl}`
  }

  return undefined
}

export { STRAPI_BASE_URL, getMediaUrl }
