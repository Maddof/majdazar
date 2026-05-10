import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles.css";
import { PROJECT_CARDS_COPY } from "~/content/copy";
import type { ProjectContent } from "~/utils/strapi/projects";
import { StrapiRichText } from "../rich-text/StrapiRichText";
import { Button } from "../ui/button";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProjectsSections({
  title,
  description,
  projects,
}: {
  title: string;
  description: string;
  projects: ProjectContent[];
}) {
  const closeCaseStudyButtonRef = useRef<HTMLButtonElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start end", "end start"],
  });

  const projectsY = useTransform(scrollYProgress, [0, 1], ["-100vh", "100vh"]);

  const projectsOpacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);

  return (
    <section
      ref={projectsSectionRef}
      className="relative overflow-hidden"
      id="projects"
    >
      <div className="custom-shape-divider-top pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 0 598.97 114.72 1200 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <motion.h2
        style={{ y: projectsY, opacity: projectsOpacity }}
        className="text-primary absolute top-30 z-30 text-[550%] leading-none font-black uppercase [writing-mode:vertical-lr] sm:text-[800%] md:text-[900%]"
      >
        {title}
      </motion.h2>

      <div className="container">
        <div className="flex gap-4 pl-22 sm:pl-28 md:ml-2 md:pl-30 2xl:pl-0">
          <div className="hidden w-1/3 items-center justify-center md:flex">
            <p className="hidden md:block">{description}</p>
          </div>
          <div className="flex w-full items-center justify-end md:w-2/3">
            <div className="relative w-full">
              <div className="mb-8 flex w-full items-center justify-center md:hidden">
                <p className="isolate block max-w-56 text-center text-white md:hidden">
                  {description}
                </p>
              </div>

              <Swiper
                direction="vertical"
                slidesPerView={1}
                spaceBetween={24}
                pagination={{ clickable: true }}
                navigation={{
                  prevEl: ".projects-prev",
                  nextEl: ".projects-next",
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper h-100 w-full sm:h-150 md:h-200"
              >
                <button className="projects-prev absolute top-4 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
                  <ChevronUp className="h-8 w-8 text-white" />
                </button>
                {projects.map((project, index) => (
                  <SwiperSlide key={index}>
                    <div className="border-primary relative flex h-full items-center justify-center overflow-hidden border p-8">
                      <img
                        src={project.featuredImageUrl || ""}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="z-10 max-w-xl text-center text-white">
                        <h2 className="inline-block border border-white/30 bg-black/25 px-4 py-2 text-xl font-black tracking-[0.2em] text-white uppercase backdrop-blur-sm sm:text-2xl">
                          {project.title}
                        </h2>
                        <p className="mt-3 mb-2 max-w-sm text-sm leading-relaxed text-white/85 sm:text-base">
                          {project.shortDesc}
                        </p>
                        {project.liveLink ? (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-0 right-0 m-4 inline-flex items-center justify-center text-sm font-semibold uppercase underline underline-offset-4 hover:text-white/80"
                          >
                            {PROJECT_CARDS_COPY.visitSiteLabel}
                          </a>
                        ) : null}
                        <Dialog>
                          <DialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                className="ml-2 p-0 text-sm uppercase underline underline-offset-4 hover:text-white/80"
                              >
                                {PROJECT_CARDS_COPY.viewCaseStudyLabel}
                              </Button>
                            }
                          ></DialogTrigger>
                          <DialogContent
                            className={`bg-cover bg-top text-white sm:max-h-[80dvh] sm:min-h-[70dvh] sm:min-w-[60dvw]`}
                            style={{
                              backgroundImage: `url('${project.featuredImageUrl || ""}')`,
                            }}
                            showCloseButton={false}
                            initialFocus={closeCaseStudyButtonRef}
                          >
                            <div className="bg-primary/50 pointer-events-none absolute inset-0" />
                            <div className="from-primary via-primary/90 pointer-events-none absolute inset-0 bg-linear-to-tr to-transparent" />

                            <DialogHeader>
                              <DialogTitle className="z-10 text-2xl font-bold tracking-widest text-white uppercase">
                                {project.title}{" "}
                                {PROJECT_CARDS_COPY.caseStudySuffix}
                              </DialogTitle>
                              <DialogDescription
                                className="z-10 mt-4 text-base text-white"
                                render={<div />}
                              >
                                <div className="scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                                  <StrapiRichText
                                    blocks={project.description}
                                    className="max-w-[58ch] text-white"
                                    emptyText={
                                      PROJECT_CARDS_COPY.richTextEmptyLabel
                                    }
                                  />
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="z-10 mt-auto text-white">
                              {project.liveLink ? (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center text-sm font-semibold uppercase underline underline-offset-4 hover:text-white/80"
                                >
                                  {PROJECT_CARDS_COPY.visitSiteLabel}
                                </a>
                              ) : null}
                              <DialogClose
                                render={
                                  <Button
                                    variant="outline"
                                    className="text-white hover:text-white/80"
                                    ref={closeCaseStudyButtonRef}
                                    id="close-case-study-button"
                                  >
                                    {PROJECT_CARDS_COPY.closeLabel}
                                  </Button>
                                }
                              />
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <button className="projects-next absolute bottom-4 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
                  <ChevronDown className="h-8 w-8 text-white" />
                </button>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
