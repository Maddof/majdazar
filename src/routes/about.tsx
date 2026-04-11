import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import SectionIntro from '~/components/SectionIntro'
import { StrapiRichText } from '~/components/rich-text/StrapiRichText'
import { Button } from '~/components/ui/button'
import { fetchAboutContent } from '~/utils/strapi/about'
import type { AboutContent } from '~/utils/strapi/about'

export const Route = createFileRoute('/about')({
  loader: async () => {
    const aboutContent = await fetchAboutContent()
    return { aboutContent }
  },
  component: AboutPage,
})

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  title: 'More about me',
  subtitle: 'Beyond the stack',
  content: [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'I’m a developer who speaks the language of business. As a two-time founder, I understand the grit required to take an idea from 0 to 1. I work across the entire stack and across the boardroom to build tech that actually works for people.',
        },
      ],
    },
  ],
  returnHomeLinkText: 'Return to homepage',
  featuredImageUrl: '/images/homepage/majd_sketch.jpg',
  featuredImageAlt: 'pencil sketch of Majd Azar',
  featuredImageAnimatedUrl: '/images/about/majd_gif_fist_optimized.gif',
  featuredImageAnimatedAlt: 'animated pencil sketch of Majd Azar fist bumping',
}

function AboutPage() {
  const [playCount, setPlayCount] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false)

  const { aboutContent } = Route.useLoaderData()

  const aboutPageContent = {
    ...DEFAULT_ABOUT_CONTENT,
    ...aboutContent,
  }

  const navigate = useNavigate()

  const handleAnimation = () => {
    setPlayCount((count) => count + 1)
    setDisabledButton(true)

    setTimeout(() => {
      setPlayCount(0)
      setDisabledButton(false)
      navigate({ to: '/' })
    }, 2500) // Match the duration of the GIF animation
  }

  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <SectionIntro
              title={aboutPageContent.title}
              subtitle={aboutPageContent.subtitle}
              showBackgroundAccent={false}
            />

            <div className="mt-6 flex flex-col gap-6">
              <StrapiRichText
                blocks={aboutPageContent.content}
                emptyText="About content is coming soon."
              />

              <Button
                onClick={handleAnimation}
                className="hover:opacity-80"
                disabled={disabledButton}
              >
                {playCount > 0
                  ? 'Returning...'
                  : aboutPageContent.returnHomeLinkText}
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden border border-black">
            <img
              src={aboutPageContent.featuredImageUrl}
              alt={aboutPageContent.featuredImageAlt}
              className={`h-full w-full object-cover transition-opacity duration-300`}
              loading="eager"
            />

            {playCount > 0 ? (
              <img
                key={playCount}
                src={`${aboutPageContent.featuredImageAnimatedUrl}?play=${playCount}`}
                alt={aboutPageContent.featuredImageAnimatedAlt}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300`}
                loading="eager"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
