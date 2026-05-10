import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { buttonVariants } from "~/components/ui/button";

type AboutContent = {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  readMoreLinkText?: string;
};

type AboutSectionProps = {
  aboutContent: AboutContent;
};

export function AboutSection({ aboutContent }: AboutSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const backgroundImageUrl =
    aboutContent.imageUrl || "/images/homepage/majd_anime_in_business-bg.webp";

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
      className="relative flex min-h-svh overflow-hidden bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="relative z-20 flex w-full flex-1 flex-col gap-8 text-center text-base text-white">
        <motion.h2
          className="absolute top-1/2 z-30 -translate-y-1/2 text-[550%] leading-none font-black text-white/75 uppercase [writing-mode:vertical-lr] sm:text-[800%] md:text-[900%]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          {aboutContent.title}
        </motion.h2>
        <motion.div
          className="mx-auto my-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={linkVariants}
        >
          <Link
            to="/about"
            className={
              buttonVariants({ variant: "outline", size: "sm" }) +
              " hover:bg-white/10 hover:text-white"
            }
          >
            {aboutContent.readMoreLinkText || "More about !me"}
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
