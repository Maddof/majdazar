import { createFileRoute, Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import SignatureM from '~/components/hero/Signature'
import Typewriter from '~/components/hero/Typewriter'
import { ProjectCards } from '~/components/project-cards/ProjectCards'
import SectionIntro from '~/components/SectionIntro'
import TechSection from '~/components/toolsofthetrade/ToolsOfTheTrade'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [isSignatureDone, setIsSignatureDone] = useState(false)
  const [hasStartedScroll, setHasStartedScroll] = useState(false)
  const [isBlinkActive, setIsBlinkActive] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setHasStartedScroll(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <section
        data-hero-section
        className="relative flex min-h-[55svh] w-full flex-col gap-12 overflow-hidden bg-[url('/images/hero/bg.webp')] bg-cover text-white sm:min-h-svh"
      >
        <div className="container flex h-full flex-1 items-end sm:items-center">
          <div className="group absolute right-0 bottom-0 z-20 h-[95%] sm:right-0 md:right-0 lg:right-28 xl:right-48">
            <div className="relative h-full">
              {/* Base image */}
              <img
                src="/images/hero/majd_transp.webp"
                alt="Majd Azar"
                className="block h-full w-auto object-cover opacity-95"
              />
              {/* Hover/touch hotspot: only this area triggers the blink overlay */}
              <button
                type="button"
                aria-label="Trigger blink effect"
                onTouchStart={() => setIsBlinkActive((prev) => !prev)}
                className="peer absolute top-[8%] right-[28%] z-20 h-[26%] w-[28%] bg-transparent"
              />
              {/* Blink overlay image */}
              <img
                src="/images/hero/majd_transp_blink.webp"
                alt="Majd Azar Blinking"
                className={`pointer-events-none absolute inset-0 z-10 h-full w-auto object-cover transition-opacity duration-250 [clip-path:inset(0_0_66%_0)] peer-hover:opacity-100 ${
                  isBlinkActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
          {/* Overlay absolute */}
          <div className="from-primary/65 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-r" />

          <div className="from-primary/40 sm:from-primary/10 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" />
          <div className="z-20 flex flex-col items-start gap-2">
            <SignatureM
              onComplete={() => setIsSignatureDone(true)}
              shouldAnimateOut={hasStartedScroll}
            />
            <Typewriter
              start={isSignatureDone}
              text="Majd Azar"
              // className="text-[200%] font-bold sm:text-[250%]"
            />

            <motion.p
              className="text-[125%] sm:text-[150%]"
              initial={{ opacity: 0, y: 8 }}
              animate={
                isSignatureDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.35, delay: 1, ease: 'easeOut' }}
            >
              Full-stack Dev | Founder @ Smokify
            </motion.p>

            <motion.p
              className="max-w-xl text-[100%] leading-7 sm:text-[120%]"
              initial={{ opacity: 0, y: 4 }}
              animate={
                isSignatureDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
              }
              transition={{ duration: 0.4, delay: 1.4, ease: 'easeOut' }}
            >
              Stockholm, Sweden.
            </motion.p>
          </div>
        </div>
      </section>
      <section data-below-hero-trigger className="overflow-hidden">
        <div className="container">
          <SectionIntro
            title="My projects"
            description="From founder-led products to client platforms, these projects show how I design, build, and ship web experiences that solve real business problems."
          />

          <ProjectCards />
        </div>
      </section>
      <TechSection />
      <section id="more-about-me " className="overflow-hidden">
        <div className="container">
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="sm:w-2/4">
              <SectionIntro
                title="More about me"
                subtitle="Beyond the stack"
                description="I’m a developer who speaks the language of business. As a two-time founder, I understand the grit required to take an idea from 0 to 1. I work across the entire stack and across the boardroom to build tech that actually works for people."
              />
              <Button
                className="mt-6 w-full"
                render={<Link to="/about" />}
                nativeButton={false}
              >
                Read more
              </Button>
            </div>
            <div className="w-full sm:w-2/4">
              <img
                src="/images/homepage/majd_sketch.jpg"
                alt="More about me"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
