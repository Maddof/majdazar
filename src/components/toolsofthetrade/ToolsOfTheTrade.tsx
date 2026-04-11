import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon } from 'lucide-react'
import {
  TOOLS_COPY,
  TOOLS_FALLBACK_CATEGORIES,
  type Tool,
  type ToolCategory,
} from '~/content/copy'
import Accordion from '../accordion/Accordion'
import SectionIntro from '../SectionIntro'
import { ToolsContent } from '~/utils/strapi/homepage'

function ToolCard({
  tool,
  isActive,
  onToggle,
}: {
  tool: Tool
  isActive: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        layout: { duration: 0.6, ease: 'easeInOut' },
        opacity: { duration: 0.45 },
        y: { duration: 0.45 },
      }}
      type="button"
      aria-pressed={isActive}
      aria-label={`${tool.name}: ${tool.description}`}
      onClick={onToggle}
      className={`group/toolcard relative min-h-52.5 w-full overflow-hidden border text-left text-sm transition-colors duration-500 sm:text-base ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-primary hover:text-primary-foreground bg-white'
      }`}
    >
      <p className="absolute top-3 left-3 z-20 rotate-180 tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
        {tool.name}
      </p>

      {tool.image && (
        <img
          src={tool.image}
          alt={tool.name}
          loading="lazy"
          className={`pointer-events-none absolute top-1/2 left-1/2 h-auto max-w-3/5 -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-500 ${
            isActive
              ? 'opacity-0'
              : 'opacity-100 group-hover/toolcard:opacity-0'
          }`}
        />
      )}

      <p
        className={`text-primary-foreground pointer-events-none absolute inset-y-0 right-0 left-5 flex items-center justify-center px-4 text-center leading-relaxed transition-opacity duration-500 sm:px-6 ${
          isActive
            ? 'opacity-100'
            : 'opacity-0 group-hover/toolcard:opacity-100'
        }`}
      >
        {tool.description}
      </p>

      <PlusIcon
        className={`pointer-events-none absolute right-2 bottom-2 size-4 transition-transform duration-300 ${
          // Rotate 45 degrees when active or when hovering over the card while inactive
          isActive ? 'rotate-45' : 'group-hover/toolcard:rotate-45'
        }`}
      />
    </motion.button>
  )
}

export default function TechSection({
  toolsContent,
}: {
  toolsContent: ToolsContent
}) {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const resolvedToolCategories = useMemo<ToolCategory[]>(() => {
    if (!toolsContent.toolCategory || toolsContent.toolCategory.length === 0) {
      return TOOLS_FALLBACK_CATEGORIES
    }

    return toolsContent.toolCategory.map((category) => ({
      title: category.title,
      honorableMention: category.honorableMention,
      tools: category.toolItem.map((tool) => ({
        name: tool.title,
        image: tool.imageUrl || '',
        description: tool.description || '',
      })),
    }))
  }, [toolsContent.toolCategory])

  return (
    <>
      <section id="tools-of-the-trade">
        <div className="container">
          <SectionIntro
            className="mb-24"
            title={toolsContent.title}
            description={toolsContent.description}
          />

          {resolvedToolCategories
            .filter((c) => !c.honorableMention)
            .map((category, index) => (
              <div key={category.title}>
                <Accordion title={category.title} index={index}>
                  {category.tools.length > 0 ? (
                    <motion.div
                      layout
                      className="mb-8 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 xl:grid-cols-4"
                    >
                      {category.tools.map((tool, i) => (
                        <motion.div
                          key={tool.name}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            layout: { duration: 0.6, ease: 'easeInOut' },
                            opacity: { duration: 0.4, delay: i * 0.06 },
                            y: { duration: 0.4, delay: i * 0.06 },
                          }}
                        >
                          <ToolCard
                            tool={tool}
                            isActive={activeTool === tool.name}
                            onToggle={() => {
                              setActiveTool((currentTool) =>
                                currentTool === tool.name ? null : tool.name,
                              )
                            }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-muted-foreground">
                      {TOOLS_COPY.comingSoonLabel}
                    </p>
                  )}
                </Accordion>
              </div>
            ))}
        </div>
      </section>
      <section id="honorable-mentions">
        <div className="container">
          <SectionIntro
            title={
              toolsContent.titleHonorable || TOOLS_COPY.honorableMentionsTitle
            }
            description={
              toolsContent.descriptionHonorable ||
              TOOLS_COPY.honorableMentionsDescription
            }
          />
          <ul className="my-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {resolvedToolCategories
              .filter((c) => c.honorableMention)
              .flatMap((c) => c.tools)
              .map((tool) => (
                <li key={tool.name} className="rounded border px-3 py-2">
                  {tool.name}
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  )
}
