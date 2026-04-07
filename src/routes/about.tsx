import { createFileRoute, Link } from '@tanstack/react-router'
import SectionIntro from '~/components/SectionIntro'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <SectionIntro
              title="About Me"
              subtitle="Entrepreneur, builder, and full-stack developer"
              description="I build products that connect strong technical execution with real business outcomes. Over the years, I have worked across front-end, back-end, and product strategy to take ideas from concept to shipped experiences."
              showBackgroundAccent={false}
            />

            <div className="mt-6 space-y-4 leading-7">
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
            </div>

            <div className="mt-8">
              <Button nativeButton={false} render={<Link to="/" />}>
                Back to home
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/homepage/majd_sketch.jpg"
              alt="Portrait sketch of Majd Azar"
              className="border-border/50 w-full border object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
