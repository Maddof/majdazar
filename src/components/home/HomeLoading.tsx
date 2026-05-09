import { motion } from "framer-motion";

export function HomeLoading() {
  return (
    <motion.div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Left curtain */}
      <motion.div
        className="bg-primary h-full w-1/2"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Right curtain */}
      <motion.div
        className="bg-primary h-full w-1/2"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center content */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35 }}
      >
        <motion.img
          src="/images/assets/signatur_majd-azar.svg"
          alt="Majd Azar Signature"
          className="w-40"
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
