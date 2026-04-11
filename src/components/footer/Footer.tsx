import { motion, type Variants } from 'framer-motion'
import { FOOTER_COPY } from '~/content/copy'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export function Footer() {
  return (
    <footer className="border-muted/50 bg-primary mt-16 border-t py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="container flex flex-col items-center gap-3 text-center text-white"
      >
        <motion.p
          variants={itemVariants}
          className="text-2xl font-bold tracking-tight uppercase sm:text-3xl"
        >
          {FOOTER_COPY.name}
        </motion.p>
        <motion.img
          variants={itemVariants}
          src="/images/assets/signatur_majd-azar.svg"
          alt={FOOTER_COPY.signatureAlt}
          className="mx-1 h-18 w-auto"
        />
        <motion.p variants={itemVariants}>
          © {new Date().getFullYear()} | {FOOTER_COPY.builtWithLabel}
        </motion.p>
      </motion.div>
    </footer>
  )
}
