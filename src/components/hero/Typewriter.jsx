import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Typewriter({
  text,
  className,
  speed = 100,
  cursor = true,
  start = true,
  as: Component = 'h1',
  ...props // Pass through any additional props to the component (e.g., aria-label, id, role, etc.)
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset typing effect when text changes
  useEffect(() => {
    if (!start) {
      setCurrentIndex(0)
      return
    }

    setCurrentIndex(0)
  }, [text, start])

  useEffect(() => {
    if (!start) return
    if (currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text.length, speed, start])

  // Text to display based on current index
  const visibleText = text.slice(0, currentIndex)

  const isTyping = start && currentIndex < text.length

  return (
    <Component className={`relative inline-block ${className || ''}`} aria-label={text} {...props}>
      {/* Ghost: takes space but not visible */}

      <span className="invisible whitespace-pre">
        {text}
        {cursor ? '|' : ''}
      </span>

      {/* Real animated content on top */}
      <span className="absolute inset-0 whitespace-pre">
        {visibleText}
        {cursor && start && (
          <motion.span
            className="inline-block"
            animate={isTyping ? { opacity: 1 } : { opacity: [1, 0, 1] }}
            transition={
              isTyping ? { duration: 0 } : { duration: 1, repeat: Infinity, ease: 'linear' }
            }
          >
            |
          </motion.span>
        )}
      </span>
    </Component>
  )
}
