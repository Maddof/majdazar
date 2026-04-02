import { motion } from 'framer-motion'

const strokePath =
  'M71.6 109.4c-47.2 113.8-55.8 157.7-45 164.5 29.9 18.9 190.7-207 189.7-213.5-.5-3.2-33.4 30.3-56.2 71.1-16.1 28.7-22.9 69.1-12.9 74.6 3.5 1.9 9.1-.4 14.8-4.7 42.8-32.7 100.2-149.8 91.4-155.7-7.3-4.8-39.8 33.4-53.4 68.1-8 20.5-24 54.2-11.8 86.2 11.5 30.1 50.6 32.5 52.1 32.7 8.6.9 22.5 1.4 61.1-16.2 50.2-23 72.7-42.8 95-64.6 17.2-16.9 18.6-22.9 18.2-27.4-1.9-25.2-62.3-39.7-77.6-42.8-142.5-29-331.7 89.7-330.1 96.9 1.6 7.2 69.9-20.6 126.2-37.1 77.7-22.8 86.8-33.9 167.3-55.8 26.7-7.2 53.5-13.1 107.1-24.7 74.7-16.2 85.1-16.4 85.7-14.4.5 1.5-4.5 5.1-25.5 13.9'

export default function SignatureM({
  className = 'h-auto w-40 sm:w-60',
  shouldAnimate = true,
}) {
  return (
    <motion.svg
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d={strokePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          shouldAnimate
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 2, ease: 'easeInOut' },
          opacity: { duration: 1.5, ease: 'easeInOut' },
        }}
      />
    </motion.svg>
  )
}
