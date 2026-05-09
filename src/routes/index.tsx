import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOME_COPY, HOME_DEFAULT_CONTENT } from "~/content/copy";
import SignatureHero from "~/components/hero/Signature";
import SignatureHeader from "~/components/header/Signature";
import Typewriter from "~/components/hero/Typewriter";
import { ProjectCards } from "~/components/project-cards/ProjectCards";
import SectionIntro from "~/components/SectionIntro";
import TechSection from "~/components/toolsofthetrade/ToolsOfTheTrade";
import { AboutSection } from "~/components/about/AboutSection";
import { HomeLoading } from "~/components/home/HomeLoading";
import { fetchHomepageContent } from "~/utils/strapi/homepage";
import { fetchProjects } from "~/utils/strapi/projects";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [homepage, projects] = await Promise.all([
      fetchHomepageContent(),
      fetchProjects(),
    ]);

    return { homepage, projects };
  },
  component: Home,
});

function Home() {
  const { homepage, projects } = Route.useLoaderData();
  const [isSignatureDone, setIsSignatureDone] = useState(false);
  const [hasStartedScroll, setHasStartedScroll] = useState(false);
  const [isBlinkActive, setIsBlinkActive] = useState(false);
  const blinkTimeoutRef = useRef<number | null>(null);

  const [showIntroLoader, setShowIntroLoader] = useState(true);
  const [isLoaderDone, setIsLoaderDone] = useState(false);

  // Ensure the intro loader is shown for at least 2 seconds, even if the page loads faster than that, to allow the animation to be appreciated and avoid a flash of content if loading is very fast.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowIntroLoader(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showIntroLoader) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showIntroLoader]);

  const heroContent = {
    ...HOME_DEFAULT_CONTENT.hero,
    ...homepage?.hero,
  };

  const projectsContent = {
    ...HOME_DEFAULT_CONTENT.projects,
    ...homepage?.projects,
  };

  const toolsContent = {
    ...HOME_DEFAULT_CONTENT.tools,
    ...homepage?.tools,
  };

  const aboutContent = {
    ...HOME_DEFAULT_CONTENT.about,
    ...homepage?.about,
  };

  useEffect(() => {
    const onScroll = () => {
      setHasStartedScroll(window.scrollY > 110);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (blinkTimeoutRef.current !== null) {
        window.clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <AnimatePresence
        onExitComplete={() => {
          setIsLoaderDone(true);
        }}
      >
        {showIntroLoader && <HomeLoading />}
      </AnimatePresence>

      <section
        id="hero"
        data-light-header
        className="relative flex min-h-[90svh] w-full flex-col gap-12 overflow-hidden bg-cover p-0 text-white sm:min-h-svh"
        style={{
          backgroundImage: `url('${heroContent.backgroundImageUrl}')`,
        }}
      >
        <motion.span
          initial="hidden"
          animate={isLoaderDone ? "visible" : "hidden"}
          variants={itemVariants}
          className="absolute top-8 z-30 text-[550%] leading-none font-black text-white/75 uppercase [writing-mode:vertical-lr] sm:text-[800%] md:text-[900%]"
        >
          FullStack
        </motion.span>
        <div className="container flex h-full flex-1 items-end sm:items-center">
          <div className="group absolute right-0 bottom-0 z-20 h-[95%] sm:right-0 md:right-0 lg:right-28 xl:right-48">
            <motion.div
              className="relative h-full"
              id="portrait-container"
              initial={{ x: -10 }}
              animate={isLoaderDone ? { x: -10 } : { x: -120 }}
              transition={{
                // delay: 0.5,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Base image */}
              <img
                src={heroContent.portraitImageUrl}
                alt={heroContent.portraitImageAlt || heroContent.typedName}
                className="block h-full w-auto object-cover opacity-95"
              />
              {/* Hover/touch hotspot: only this area triggers the blink overlay */}
              <button
                type="button"
                aria-label={HOME_COPY.triggerBlinkLabel}
                onTouchStart={() => setIsBlinkActive((prev) => !prev)}
                className="peer absolute top-[8%] right-[28%] z-20 h-[26%] w-[28%] bg-transparent"
              />
              {/* Blink overlay image */}
              <img
                src={heroContent.portraitBlinkImageUrl}
                alt={
                  heroContent.portraitBlinkImageAlt ||
                  `${heroContent.typedName} Blinking`
                }
                className={`pointer-events-none absolute inset-0 h-full w-auto object-cover transition-opacity duration-250 [clip-path:inset(0_0_66%_0)] peer-hover:opacity-100 ${
                  isBlinkActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          </div>
          <div className="z-30 flex flex-col items-start gap-2 pb-10 pl-20">
            <SignatureHero
              shouldStart={isLoaderDone}
              onComplete={() => setIsSignatureDone(true)}
              shouldAnimateOut={hasStartedScroll}
            />
            <Typewriter
              start={isSignatureDone}
              text={heroContent.typedName}
              onAnimationComplete={() => {
                if (isSignatureDone) {
                  setIsBlinkActive(true);
                  if (blinkTimeoutRef.current !== null) {
                    window.clearTimeout(blinkTimeoutRef.current);
                  }
                  blinkTimeoutRef.current = window.setTimeout(() => {
                    setIsBlinkActive(false);
                    blinkTimeoutRef.current = null;
                  }, 1500);
                }
              }}
            />
          </div>
          {/* Overlay absolute */}
          <div className="from-primary/70 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-r" />

          <div className="from-primary/95 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" />
          <div className="from-primary/30 to-primary/0 pointer-events-none absolute inset-0 z-20 bg-linear-to-tr" />
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="container">
          <SectionIntro
            title={projectsContent.title}
            description={projectsContent.description}
          />

          <ProjectCards projects={projects} />
        </div>
      </section>
      <TechSection toolsContent={toolsContent} />
      <AboutSection aboutContent={aboutContent} />
    </>
  );
}
