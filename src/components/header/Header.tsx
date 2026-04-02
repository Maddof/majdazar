import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import SignatureM from '~/components/header/Signature'

export function Header() {
  const [useLightColor, setUseLightColor] = useState(false)
  const [hasStartedScroll, setHasStartedScroll] = useState(false)

  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>(
      '[data-hero-section]',
    )
    const triggerSection = document.querySelector<HTMLElement>(
      '[data-below-hero-trigger]',
    )

    const updateHeaderState = () => {
      if (window.scrollY > 140) {
        setHasStartedScroll(true)
      }

      // Pages without a hero should use the default dark header color.
      if (!heroSection || !triggerSection) {
        setUseLightColor(false)
        return
      }

      const triggerTop = triggerSection.getBoundingClientRect().top
      setUseLightColor(triggerTop > 72) // 72 is the header height, so we switch to light color when the trigger section goes under the header
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    window.addEventListener('resize', updateHeaderState)

    return () => {
      window.removeEventListener('scroll', updateHeaderState)
      window.removeEventListener('resize', updateHeaderState)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xs backdrop-opacity-35">
      <div
        className={`container flex min-h-16 items-center justify-between py-4 transition-colors duration-300 ${
          useLightColor ? 'text-white' : 'text-foreground'
        }`}
      >
        <Link
          to="/"
          aria-label="Go to home"
          className="transition-opacity hover:opacity-80"
        >
          <SignatureM
            className="h-auto w-24 sm:w-28"
            shouldAnimate={hasStartedScroll}
          />
        </Link>

        <motion.button
          aria-label="Open navigation menu"
          className="cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
        >
          <Menu className="size-10" />
        </motion.button>
      </div>
    </header>
  )
}
