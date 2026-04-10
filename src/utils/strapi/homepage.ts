import { createServerFn } from '@tanstack/react-start'
import { STRAPI_BASE_URL, getMediaUrl, getMediaAlternativeText } from './shared'

type HeroContent = {
  typedName: string
  title: string
  location: string
  summary?: string
  backgroundImageUrl?: string
  portraitImageUrl?: string
  portraitImageAlt?: string
  portraitBlinkImageUrl?: string
  portraitBlinkImageAlt?: string
}

type ProjectsContent = {
  title: string
  description?: string
}

type ToolsContent = {
  title: string
  description?: string
  toolCategory?: ToolCategoryContent[]
  titleHonorable?: string
  descriptionHonorable?: string
}

type ToolCategoryContent = {
  id?: number
  title: string
  honorableMention: boolean
  toolItem: ToolItemContent[]
}

type ToolItemContent = {
  id?: number
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
}

type HomepageContent = {
  hero: HeroContent | null
  projects: ProjectsContent | null
  tools: ToolsContent | null
}

function normalizeHeroPayload(
  attributes: Record<string, unknown>,
): HeroContent | null {
  const heroUnknown = attributes.hero
  if (!heroUnknown || typeof heroUnknown !== 'object') {
    return null
  }

  const hero = heroUnknown as Record<string, unknown>
  const typedName =
    typeof hero.typedName === 'string' ? hero.typedName : 'Majd Azar'
  const title =
    typeof hero.title === 'string'
      ? hero.title
      : 'Full-stack Dev | Founder @ Smokify'
  const location =
    typeof hero.location === 'string' ? hero.location : 'Stockholm, Sweden.'
  const summary = typeof hero.summary === 'string' ? hero.summary : undefined

  return {
    typedName,
    title,
    location,
    summary,
    backgroundImageUrl: getMediaUrl(hero.backgroundImage),
    portraitImageUrl: getMediaUrl(hero.portraitImage),
    portraitImageAlt: getMediaAlternativeText(hero.portraitImage),
    portraitBlinkImageUrl: getMediaUrl(hero.portraitBlinkImage),
    portraitBlinkImageAlt: getMediaAlternativeText(hero.portraitBlinkImage),
  }
}

function normalizeProjectsPayload(
  attributes: Record<string, unknown>,
): ProjectsContent | null {
  const projectsUnknown = attributes.projects
  if (!projectsUnknown || typeof projectsUnknown !== 'object') {
    return null
  }

  const projects = projectsUnknown as Record<string, unknown>
  const title =
    typeof projects.title === 'string' ? projects.title : 'My projects'
  const description =
    typeof projects.description === 'string'
      ? projects.description
      : 'From founder-led products to client platforms, these projects show how I design, build, and ship web experiences that solve real business problems.'

  return {
    title,
    description,
  }
}

function normalizeToolsSectionPayload(
  attributes: Record<string, unknown>,
): ToolsContent | null {
  const toolsUnknown = attributes.tools
  if (!toolsUnknown || typeof toolsUnknown !== 'object') {
    return null
  }

  const tools = toolsUnknown as Record<string, unknown>
  const title = typeof tools.title === 'string' ? tools.title : 'Tools'
  const description =
    typeof tools.description === 'string' ? tools.description : undefined
  const toolCategory = normalizeToolCategoriesPayload(tools.toolCategory)

  const titleHonorable =
    typeof tools.titleHonorable === 'string'
      ? tools.titleHonorable
      : 'Honorable Mentions'
  const descriptionHonorable =
    typeof tools.descriptionHonorable === 'string'
      ? tools.descriptionHonorable
      : 'Here are some additional tools and technologies that I have experience with and want to give a shoutout to.'

  return {
    title,
    description,
    toolCategory,
    titleHonorable,
    descriptionHonorable,
  }
}

function normalizeToolCategoriesPayload(
  value: unknown,
): ToolCategoryContent[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const categories: ToolCategoryContent[] = []

  for (const entry of value) {
    if (!entry || typeof entry !== 'object') {
      continue
    }

    const category = entry as Record<string, unknown>
    const id = typeof category.id === 'number' ? category.id : undefined
    const title =
      typeof category.title === 'string' ? category.title : 'Untitled category'
    const honorableMention =
      typeof category.honorableMention === 'boolean'
        ? category.honorableMention
        : false

    categories.push({
      id,
      title,
      honorableMention,
      toolItem: normalizeToolItemsPayload(category.toolItem),
    })
  }

  return categories
}

function normalizeToolItemsPayload(value: unknown): ToolItemContent[] {
  if (!Array.isArray(value)) {
    return []
  }

  const items: ToolItemContent[] = []

  for (const entry of value) {
    if (!entry || typeof entry !== 'object') {
      continue
    }

    const item = entry as Record<string, unknown>
    const title = typeof item.title === 'string' ? item.title : 'Untitled tool'
    const normalizedItem: ToolItemContent = {
      title,
      ...(typeof item.id === 'number' ? { id: item.id } : {}),
      ...(typeof item.description === 'string'
        ? { description: item.description }
        : {}),
    }

    const imageUrl = getMediaUrl(item.image)
    if (imageUrl) {
      normalizedItem.imageUrl = imageUrl
    }

    const imageAlt = getMediaAlternativeText(item.image)
    if (imageAlt) {
      normalizedItem.imageAlt = imageAlt
    }

    items.push(normalizedItem)
  }

  return items
}

function normalizeHomepagePayload(payload: unknown): HomepageContent | null {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const root = payload as Record<string, unknown>
  const data = root.data
  if (!data || typeof data !== 'object') {
    return null
  }

  const entity = data as Record<string, unknown>
  const attributes =
    (entity.attributes as Record<string, unknown> | undefined) || entity

  return {
    hero: normalizeHeroPayload(attributes),
    projects: normalizeProjectsPayload(attributes),
    tools: normalizeToolsSectionPayload(attributes),
  }
}

const fetchHomepageContent = createServerFn({ method: 'GET' }).handler(
  async (): Promise<HomepageContent | null> => {
    const HOMEPAGE_QUERY_STRING =
      'populate[hero][populate]=*' +
      '&populate[projects]=*' +
      '&populate[tools][populate][toolCategory][populate][toolItem][populate]=image'

    try {
      const res = await fetch(
        `${STRAPI_BASE_URL}/api/homepage?${HOMEPAGE_QUERY_STRING}`,
      )

      if (!res.ok) {
        const errorBody = await res.text().catch(() => '')
        console.error(
          `Failed to fetch homepage content. Status: ${res.status} StatusText: ${res.statusText}`,
          errorBody,
        )
        return null
      }

      const payload = (await res.json()) as unknown

      // console.log(
      //   '🚀 ~ file: homepage.ts:173 ~ fetchHomepageContent ~ payload:',
      // )
      // console.dir({ payload }, { depth: null })

      const normalizedContent = normalizeHomepagePayload(payload)

      // console.debug('Homepage tools normalized:', {
      //   categoriesCount: normalizedContent?.tools?.toolCategory?.length ?? 0,
      //   toolCategory: normalizedContent?.tools?.toolCategory,
      // })

      // console.log(
      //   '🚀 ~ file: homepage.ts:177 ~ fetchHomepageContent ~ normalizedContent:',
      //   normalizedContent,
      // )

      return normalizedContent
    } catch (error) {
      console.error(
        'Failed to fetch homepage content due to network/runtime error:',
        error,
      )
      return null
    }
  },
)

export type {
  HeroContent,
  ProjectsContent,
  HomepageContent,
  ToolsContent,
  ToolCategoryContent,
  ToolItemContent,
}
export { fetchHomepageContent }
