import { STRAPI_BASE_URL, getMediaUrl, getMediaAlternativeText } from './shared'
import { createServerFn } from '@tanstack/react-start'
import type { StrapiBlockNode } from './projects'

type AboutContent = {
  title: string
  subtitle?: string
  content: StrapiBlockNode[]
  returnHomeLinkText?: string
  featuredImageUrl?: string
  featuredImageAlt?: string
  featuredImageAnimatedUrl?: string
  featuredImageAnimatedAlt?: string
}

function normalizeAboutBlocks(value: unknown): StrapiBlockNode[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((block): block is StrapiBlockNode => {
    if (!block || typeof block !== 'object') {
      return false
    }

    const candidate = block as Record<string, unknown>
    if (candidate.type !== 'paragraph' && candidate.type !== 'heading') {
      return false
    }

    return Array.isArray(candidate.children)
  })
}

const normalizeAboutPagePayload = (payload: unknown): AboutContent | null => {
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('data' in payload) ||
    typeof (payload as Record<string, unknown>).data !== 'object' ||
    (payload as Record<string, unknown>).data === null
  ) {
    return null
  }

  const data = (payload as Record<string, unknown>).data as Record<
    string,
    unknown
  >

  const title = typeof data.title === 'string' ? data.title : null
  if (title === null) {
    return null
  }

  const subtitle = typeof data.subtitle === 'string' ? data.subtitle : undefined
  const returnHomeLinkText =
    typeof data.returnHomeLinkText === 'string'
      ? data.returnHomeLinkText
      : undefined
  const featuredImageUrl = getMediaUrl(data.featuredImage)
  const featuredImageAlt = getMediaAlternativeText(data.featuredImage)
  const featuredImageAnimatedUrl = getMediaUrl(data.featuredImageAnimated)
  const featuredImageAnimatedAlt = getMediaAlternativeText(
    data.featuredImageAnimated,
  )

  return {
    title,
    subtitle,
    content: normalizeAboutBlocks(data.content),
    returnHomeLinkText,
    featuredImageUrl,
    featuredImageAlt,
    featuredImageAnimatedUrl,
    featuredImageAnimatedAlt,
  }
}

const fetchAboutContent = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AboutContent | null> => {
    const ABOUT_QUERY_STRING = 'populate=*'

    try {
      const res = await fetch(
        `${STRAPI_BASE_URL}/api/about?${ABOUT_QUERY_STRING}`,
      )

      if (!res.ok) {
        const errorBody = await res.text().catch(() => '')
        console.error('Failed to fetch about content:', {
          status: res.status,
          statusText: res.statusText,
          body: errorBody,
        })
        return null
      }

      const payload = (await res.json()) as unknown

      const normalizedContent = normalizeAboutPagePayload(payload)

      return normalizedContent
    } catch (error) {
      console.error('Error fetching about content:', error)
      return null
    }
  },
)

export type { AboutContent }

export { fetchAboutContent }
