import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { StrapiRichText } from "~/components/rich-text/StrapiRichText";
import { ABOUT_PAGE_COPY, ABOUT_PAGE_DEFAULT_CONTENT } from "~/content/copy";
import { fetchAboutContent } from "~/utils/strapi/about";
import type { AboutContent } from "~/utils/strapi/about";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const aboutContent = await fetchAboutContent();
    return { aboutContent };
  },
  component: AboutPage,
});

const DEFAULT_ABOUT_CONTENT: AboutContent = ABOUT_PAGE_DEFAULT_CONTENT;

function AboutPage() {
  const [playCount, setPlayCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  const { aboutContent } = Route.useLoaderData();

  const aboutPageContent = {
    ...DEFAULT_ABOUT_CONTENT,
    ...aboutContent,
  };

  const navigate = useNavigate();

  const handleAnimation = () => {
    setPlayCount((count) => count + 1);
    setDisabledButton(true);

    setTimeout(() => {
      setPlayCount(0);
      setDisabledButton(false);
      navigate({ to: "/" });
    }, 2500); // Match the duration of the GIF animation
  };

  return (
    <section className="">
      <div className="container">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-3 sm:items-start">
          <div className="col-span-3">
            <h2 className="text-primary relative z-30 text-[450%] leading-none font-black uppercase sm:text-[800%] md:text-[900%]">
              {aboutPageContent.title}
            </h2>
          </div>
          <div className="col-span-3 sm:col-span-2">
            {aboutPageContent.subtitle && (
              <h3 className="mb-4">{aboutPageContent.subtitle}</h3>
            )}

            <div className="mt-6 flex flex-col gap-6">
              <StrapiRichText
                blocks={aboutPageContent.content}
                emptyText={ABOUT_PAGE_COPY.richTextEmptyLabel}
              />
              <Link to="/" className="underline underline-offset-4">
                {aboutPageContent.returnHomeLinkText}
              </Link>

              {/* <Button
                onClick={handleAnimation}
                className="hover:opacity-80"
                disabled={disabledButton}
              >
                {playCount > 0
                  ? ABOUT_PAGE_COPY.returningLabel
                  : aboutPageContent.returnHomeLinkText}
              </Button> */}
            </div>
          </div>
          <div className="sticky top-20 z-0 col-span-3 self-start sm:col-span-1">
            <div className="relative overflow-hidden border border-black">
              <img
                src={aboutPageContent.featuredImageUrl}
                alt={aboutPageContent.featuredImageAlt}
                loading="eager"
              />

              {/* {playCount > 0 ? (
                <img
                  key={playCount}
                  src={`${aboutPageContent.featuredImageAnimatedUrl}?play=${playCount}`}
                  alt={aboutPageContent.featuredImageAnimatedAlt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300`}
                  loading="eager"
                />
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
