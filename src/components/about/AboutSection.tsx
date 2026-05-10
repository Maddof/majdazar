import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { Button } from "~/components/ui/button";

type AboutContent = {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type AboutSectionProps = {
  aboutContent: AboutContent;
};

export function AboutSection({ aboutContent }: AboutSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      data-light-header
      id="more-about-me"
      className="relative flex min-h-svh overflow-hidden bg-[url('/images/homepage/majd_city.jpg')] bg-cover bg-center bg-no-repeat py-16"
    >
      <div className="relative z-20 flex w-full flex-1 flex-col gap-8 text-center text-base text-white sm:p-8">
        <motion.h2
          className="absolute text-[650%] leading-none text-white/75 uppercase [writing-mode:vertical-lr] sm:text-[800%] md:text-[1000%]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          About
        </motion.h2>
        <motion.div
          className="mx-auto my-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={linkVariants}
        >
          <Link to="/about">
            <Button
              variant="outline"
              className="hover:bg-white/10 hover:text-white"
            >
              More about me
            </Button>
          </Link>
        </motion.div>
      </div>
      {/* Overlay absolute */}
      <div className="from-primary/50 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" />
      <div className="from-primary/10 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-b" />

      {/* <div className="from-primary/95 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" /> */}
    </section>
  );
}
