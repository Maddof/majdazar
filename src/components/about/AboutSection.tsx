import { Link } from "@tanstack/react-router";
import { HOME_COPY } from "~/content/copy";
import SectionIntro from "~/components/SectionIntro";
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
  return (
    <section
      id="more-about-me"
      className="relative flex min-h-[100svh] overflow-hidden bg-[url('/images/homepage/majd_city.jpg')] bg-cover bg-center bg-no-repeat py-16"
    >
      <div className="relative z-20 flex w-full flex-1 flex-col gap-8 text-center text-base text-white sm:p-8">
        <h2 className="w-full text-[600%] leading-none text-white/25 uppercase sm:text-[800%] md:text-[1200%]">
          Beyond the stack
        </h2>
        <Link to="/about">
          <Button
            variant="outline"
            className="hover:bg-white/10 hover:text-white"
          >
            Learn more about me
          </Button>
        </Link>
      </div>
      {/* Overlay absolute */}
      <div className="from-primary/90 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" />
      <div className="from-primary/10 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-b" />

      {/* <div className="from-primary/95 to-primary/0 pointer-events-none absolute inset-0 z-10 bg-linear-to-tr" /> */}
    </section>
  );
}
