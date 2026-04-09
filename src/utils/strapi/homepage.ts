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
}

type HomepageContent = {
  hero: HeroContent | null
  projects: ProjectsContent | null
  tools: ToolsContent | null
}

const HOMEPAGE_QUERY = new URLSearchParams({
  'populate[projects]': '*',
  'populate[tools]': '*',
  'populate[hero][populate][0]': 'backgroundImage',
  'populate[hero][populate][1]': 'portraitImage',
  'populate[hero][populate][2]': 'portraitBlinkImage',
})

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

function normalizeToolsPayload(
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

  return {
    title,
    description,
  }
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
    tools: normalizeToolsPayload(attributes),
  }
}

const fetchHomepageContent = createServerFn({ method: 'GET' }).handler(
  async (): Promise<HomepageContent | null> => {
    try {
      const res = await fetch(
        `${STRAPI_BASE_URL}/api/homepage?${HOMEPAGE_QUERY.toString()}`,
      )

      if (!res.ok) {
        return null
      }

      const payload = (await res.json()) as unknown
      return normalizeHomepagePayload(payload)
    } catch {
      return null
    }
  },
)

export type { HeroContent, ProjectsContent, HomepageContent, ToolsContent }
export { fetchHomepageContent }
