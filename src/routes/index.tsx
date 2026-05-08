import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOME_COPY, HOME_DEFAULT_CONTENT } from "~/content/copy";
import SignatureHero from "~/components/hero/Signature";
import SignatureHeader from "~/components/header/Signature";
import Typewriter from "~/components/hero/Typewriter";
import { ProjectCards } from "~/components/project-cards/ProjectCards";
import SectionIntro from "~/components/SectionIntro";
import TechSection from "~/components/toolsofthetrade/ToolsOfTheTrade";
import { Button } from "~/components/ui/button";
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

function HomeLoading() {
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
        data-hero-section
        className="relative flex min-h-[95svh] w-full flex-col gap-12 overflow-hidden bg-cover text-white sm:min-h-svh"
        style={{
          backgroundImage: `url('${heroContent.backgroundImageUrl}')`,
        }}
      >
        <div className="container flex h-full flex-1 items-end sm:items-center">
          <div className="group absolute right-0 bottom-0 z-20 h-[95%] sm:right-0 md:right-0 lg:right-28 xl:right-48">
            <div className="relative h-full">
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
                className={`pointer-events-none absolute inset-0 z-10 h-full w-auto object-cover transition-opacity duration-250 [clip-path:inset(0_0_66%_0)] peer-hover:opacity-100 ${
                  isBlinkActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
          {/* Overlay absolute */}
          <div className="from-primary/70 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-r" />

          <div className="from-primary/95 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" />
          <div className="z-20 flex flex-col items-start gap-2">
            <SignatureHero
              shouldStart={isLoaderDone}
              onComplete={() => setIsSignatureDone(true)}
              shouldAnimateOut={hasStartedScroll}
            />
            <Typewriter
              start={isSignatureDone}
              text={heroContent.typedName}
              // className="text-[200%] font-bold sm:text-[250%]"
            />

            <motion.p
              className="text-[125%] sm:text-[150%]"
              initial={{ opacity: 0, y: 8 }}
              animate={
                isSignatureDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.35, delay: 1, ease: "easeOut" }}
            >
              {heroContent.title}
            </motion.p>

            <motion.p
              className="max-w-xl text-[100%] leading-7 sm:text-[120%]"
              initial={{ opacity: 0, y: 4 }}
              animate={
                isSignatureDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
              }
              transition={{ duration: 0.4, delay: 1.4, ease: "easeOut" }}
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
            >
              {heroContent.summary || heroContent.location}
            </motion.p>
          </div>
        </div>
      </section>
      <section data-below-hero-trigger className="overflow-hidden">
        <div className="container">
          <SectionIntro
            title={projectsContent.title}
            description={projectsContent.description}
          />

          <ProjectCards projects={projects} />
        </div>
      </section>
      <TechSection toolsContent={toolsContent} />
      <section id="more-about-me" className="overflow-hidden">
        <div className="container">
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="sm:w-2/4">
              <SectionIntro
                title={aboutContent.title}
                subtitle={aboutContent.subtitle}
                description={aboutContent.description}
              />
              <Button
                className="mt-6 w-full"
                render={<Link to="/about" />}
                nativeButton={false}
              >
                {HOME_COPY.readMoreCta}
              </Button>
            </div>
            <div className="w-full sm:w-2/4">
              <img
                src={aboutContent.imageUrl}
                alt={aboutContent.imageAlt || HOME_COPY.aboutImageFallbackAlt}
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
