export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@tannerlinsley' },
    { name: 'twitter:site', content: '@tannerlinsley' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image },
        ]
      : []),
  ]

  return tags
}

const SITE_URL = 'https://www.majdazar.com'

export const portfolioSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Majd Azar',
        url: SITE_URL,
        image: `${SITE_URL}/images/hero/majd_transp.webp`,
        jobTitle: 'Full-Stack Developer',
        description:
          'Full-stack developer specializing in React, Next.js, TypeScript, and Node.js, building scalable web applications.',
        homeLocation: {
          '@type': 'Place',
          name: 'Stockholm, Sweden',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Smokify',
        },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Web Development',
          'System Design',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Majd Azar',
        description:
          'Portfolio website of Majd Azar, full-stack developer and founder.',
        inLanguage: 'en',
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Majd Azar | Full-Stack Developer',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
      },
    ],
  }

  return JSON.stringify(schema)
}
