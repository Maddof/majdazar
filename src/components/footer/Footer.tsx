import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
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
          className="text-3xl font-bold tracking-tight uppercase"
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
          © {new Date().getFullYear()} | Built with React, TypeScript, and Vite
        </motion.p>
      </motion.div>
    </footer>
  )
}
