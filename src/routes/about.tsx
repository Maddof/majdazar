import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import SectionIntro from '~/components/SectionIntro'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const [playCount, setPlayCount] = useState(0)
  const [gifVisible, setGifVisible] = useState(false)

  const navigate = useNavigate()

  const handleAnimation = () => {
    setGifVisible(false)
    setPlayCount((count) => count + 1)

    setTimeout(() => {
      setPlayCount(0)
      navigate({ to: '/' })
    }, 2500) // Match the duration of the GIF animation
  }

  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <SectionIntro
              title="Beyond Code"
              subtitle="Building scalable web applications from idea to production"
              description="I build products that connect strong technical execution with real business outcomes. Over the years, I have worked across front-end, back-end, and product strategy to take ideas from concept to shipped experiences."
              showBackgroundAccent={false}
            />

            <div className="mt-6 flex flex-col gap-6">
              <p>
                My focus is modern web development with React, Next.js,
                TypeScript, Node.js, and practical system design. I care about
                performance, accessibility, and maintainable architecture, but I
                also care just as much about clarity: why we are building
                something and how it creates value.
              </p>
              <p>
                As an entrepreneur, I have learned to move between code and
                product decisions quickly. That perspective helps me build
                solutions that are not just technically solid, but useful in the
                real world.
              </p>
              <Button nativeButton={false} render={<Link to="/" />}>
                Back to home
              </Button>
              <Button onClick={handleAnimation}>
                {playCount > 0 ? 'Returning...' : 'Play animation'}
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden border border-black">
            <img
              src="/images/about/frame_0_delay-0.2s.gif"
              alt="Portrait sketch of Majd Azar saying hello"
              className={`h-full w-full object-cover transition-opacity duration-300`}
              loading="eager"
            />

            {playCount > 0 ? (
              <img
                key={playCount}
                src={`/images/about/majd_gif_fist_optimized.gif?play=${playCount}`}
                alt="Portrait sketch of Majd Azar saying hello"
                onLoad={() => setGifVisible(true)}
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
