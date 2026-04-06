import { motion, type Variants } from 'framer-motion'

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
          Majd Azar
        </motion.p>
        <motion.img
          variants={itemVariants}
          src="/images/assets/signatur_majd-azar.svg"
          alt="Majd Azar signature"
          className="mx-1 h-18 w-auto"
        />
        <motion.p variants={itemVariants}>
          © {new Date().getFullYear()} | Built with React, TypeScript, Tanstack
          and Vite
        </motion.p>
      </motion.div>
    </footer>
  )
}
