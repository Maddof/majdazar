import { factories } from '@strapi/strapi'
import type { UID } from '@strapi/strapi'

export default factories.createCoreRouter(
  'api::homepage.homepage' as UID.ContentType,
  {
    config: {
      find: {
        auth: false,
      },
      findOne: {
        auth: false,
      },
    },
  },
)
