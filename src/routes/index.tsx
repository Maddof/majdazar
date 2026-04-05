import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import SignatureM from '~/components/hero/Signature'
import Typewriter from '~/components/hero/Typewriter'
import { ProjectCards } from '~/components/project-cards/ProjectCards'
import TechSection from '~/components/toolsofthetrade/ToolsOfTheTrade'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [isSignatureDone, setIsSignatureDone] = useState(false)
  const [hasStartedScroll, setHasStartedScroll] = useState(false)

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
        className="relative flex min-h-[55dvh] w-full flex-col gap-12 bg-[url('/images/hero/majd-azar_hero-1.webp')] bg-cover bg-position-[80%_0%] text-white sm:min-h-dvh"
      >
        <div className="container flex h-full flex-1 items-end sm:items-center">
          {/* Overlay absolute */}
          <div className="from-primary/25 to-primary/0 absolute inset-0 z-10 bg-linear-to-r" />

          <div className="from-primary/40 sm:from-primary/25 to-primary/0 absolute inset-0 z-10 bg-linear-to-tr" />
          <div className="z-20 flex flex-col items-start gap-2">
            <SignatureM
              onComplete={() => setIsSignatureDone(true)}
              shouldAnimateOut={hasStartedScroll}
            />
            <Typewriter
              start={isSignatureDone}
              text="Majd Azar"
              className="text-[200%] font-bold sm:text-[250%]"
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
              className="-mt-2 max-w-xl text-[100%] leading-7 sm:text-[120%]"
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
      <section data-below-hero-trigger className="min-h-screen overflow-hidden">
        <div className="container">
          <h2 className="relative isolate mb-2 inline-block">
            My projects
            <div
              aria-hidden="true"
              className="bg-secondary absolute top-1/2 left-[0.5ch] -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2"
            />
          </h2>

          <p className="isolate max-w-2xl">
            I have worked on a variety of projects, including web applications,
            mobile applications, and open-source libraries. Some of my notable
            projects include:
          </p>
          <ProjectCards />
        </div>
      </section>
      <TechSection />
      <section className="min-h-screen">
        <div className="container">
          <h2>More about me</h2>

          <p className="isolate max-w-2xl">
            I’m a full-stack developer with a passion for building products that
            solve real problems. I have experience working with a variety of
            technologies, including React, Node.js, and TypeScript. I’m
            currently focused on building my portfolio and looking for new
            opportunities to grow and learn.
          </p>
        </div>
      </section>
    </>
  )
}
