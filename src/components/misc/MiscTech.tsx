import { useMemo, useState } from "react";
import { SpinWheel } from "./spinwheel/SpinWheel";
import { ToolsContent } from "~/utils/strapi/homepage";
import "./styles-shape-divider.css";
import { SpinWheelMobile } from "./spinwheel/SpinWheelMobile";

export function MiscTechSection({
  toolsContent,
}: {
  toolsContent: ToolsContent | null;
}) {
  const honorableMentions =
    toolsContent?.toolCategory
      ?.filter((category) => category.honorableMention)
      .flatMap((category) => category.toolItem) ?? [];
  const honorableMentionTitles = honorableMentions.map((tool) => tool.title);
  const [winnerTitle, setWinnerTitle] = useState<string | null>(null);
  const winnerTool = useMemo(
    () => honorableMentions.find((tool) => tool.title === winnerTitle) ?? null,
    [honorableMentions, winnerTitle],
  );

  console.log("Honorable mentions:", honorableMentions);

  return (
    <section id="misc-tech" className="relative overflow-hidden">
      {/* Shape divider at the top of the section */}
      <div className="custom-shape-divider-top-misc pointer-events-none">
        <svg
          data-name="Layer 2"
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
      <div className="container">
        <h2 className="text-primary relative mb-6 text-[550%] leading-none font-black uppercase sm:text-[800%] md:text-[900%]">
          {toolsContent?.titleHonorable ?? "Misc."}
        </h2>
        {/* Absolute background div */}
        <div
          aria-hidden="true"
          className="bg-secondary absolute inset-x-0 top-0 -z-10 h-48"
        />

        <div className="flex">
          <div>
            <p className="isolate max-w-2xl">
              {toolsContent?.descriptionHonorable ?? ""}
            </p>
          </div>
          <div className="-mt-20">
            <SpinWheelMobile
              items={honorableMentionTitles}
              onResultChange={setWinnerTitle}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-8 md:mt-6 md:flex-row">
          <div className="flex min-h-100 flex-auto md:flex-1">
            {winnerTool ? (
              <div className="border-secondary rounded border-2 p-4">
                {winnerTool.imageUrl && (
                  <img
                    src={winnerTool.imageUrl}
                    alt={winnerTool.imageAlt || winnerTool.title}
                    className="mb-3 h-64 w-full rounded object-cover md:h-96"
                    loading="lazy"
                  />
                )}
                <h3 className="mt-1 text-xl font-semibold tracking-wide uppercase">
                  {winnerTool.title}
                </h3>
                {winnerTool.description && (
                  <p className="text-muted-foreground mt-2">
                    {winnerTool.description}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Spin the wheel to pick a tool.
              </p>
            )}
          </div>
          <div className="flex self-center md:self-start">
            <SpinWheel
              items={honorableMentionTitles}
              onResultChange={setWinnerTitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
