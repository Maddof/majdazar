import { factories } from '@strapi/strapi'
import type { UID } from '@strapi/strapi'

export default factories.createCoreService(
  'api::homepage.homepage' as UID.ContentType,
)
