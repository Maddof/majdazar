import { createServerFn } from '@tanstack/react-start'
import { STRAPI_BASE_URL, getMediaUrl } from './shared'

type StrapiTextNode = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

type StrapiLinkNode = {
  type: 'link'
  url: string
  target?: string
  children: StrapiInlineNode[]
}

type StrapiInlineNode = StrapiTextNode | StrapiLinkNode

type StrapiBlockNode = {
  type: 'paragraph' | 'heading'
  level?: number
  children: StrapiInlineNode[]
}

type ProjectContent = {
  id: number
  documentId: string
  title: string
  description: StrapiBlockNode[]
  liveLink?: string
  featuredImageUrl?: string
}

const PROJECTS_QUERY = new URLSearchParams({
  populate: '*',
})

function normalizeProjectBlocks(value: unknown): StrapiBlockNode[] {
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

function normalizeProjectsCollection(payload: unknown): ProjectContent[] {
  if (!payload || typeof payload !== 'object') {
    return []
  }

  const root = payload as Record<string, unknown>
  const data = root.data
  if (!Array.isArray(data)) {
    return []
  }

  const projects: ProjectContent[] = []

  for (const entry of data) {
    if (!entry || typeof entry !== 'object') {
      continue
    }

    const project = entry as Record<string, unknown>
    const id = typeof project.id === 'number' ? project.id : null
    const documentId =
      typeof project.documentId === 'string' ? project.documentId : null
    const title = typeof project.title === 'string' ? project.title : null

    if (id === null || documentId === null || title === null) {
      continue
    }

    const featuredImageUrl = getMediaUrl(project.featuredImage)

    projects.push({
      id,
      documentId,
      title,
      description: normalizeProjectBlocks(project.description),
      ...(typeof project.liveLink === 'string'
        ? { liveLink: project.liveLink }
        : {}),
      ...(featuredImageUrl ? { featuredImageUrl } : {}),
    })
  }

  return projects
}

const fetchProjects = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ProjectContent[]> => {
    try {
      const res = await fetch(
        `${STRAPI_BASE_URL}/api/projects?${PROJECTS_QUERY.toString()}`,
      )

      if (!res.ok) {
        return []
      }

      const payload = (await res.json()) as unknown
      return normalizeProjectsCollection(payload)
    } catch {
      return []
    }
  },
)

export type {
  ProjectContent,
  StrapiBlockNode,
  StrapiInlineNode,
  StrapiLinkNode,
  StrapiTextNode,
}
export { fetchProjects }
