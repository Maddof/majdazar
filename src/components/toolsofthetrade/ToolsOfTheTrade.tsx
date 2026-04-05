import { useState } from 'react'
import { motion } from 'framer-motion'
import Accordion from '../accordion/Accordion'

type Tool = {
  name: string
  image: string
  description: string
}

type ToolCategory = {
  title: 'Frontend' | 'Backend' | 'DevOps/Tools'
  tools: Tool[]
}

const toolCategories: ToolCategory[] = [
  {
    title: 'Frontend',
    tools: [
      {
        name: 'NEXT',
        image: 'images/assets/icons/nextjs_symbol.png',
        description:
          'Production-ready React framework for fast routing, rendering, and deployment.',
      },
      {
        name: 'REACT',
        image: 'images/assets/icons/React_Logo.png',
        description:
          'Component-driven UI library for building interactive, maintainable interfaces.',
      },
      {
        name: 'TANSTACK',
        image: 'images/assets/icons/tanstack_logo.png',
        description:
          'Powerful routing and data tools that keep complex React apps predictable.',
      },
      {
        name: 'JAVASCRIPT',
        image: 'images/assets/icons/JavaScript_logo.png',
        description:
          'Core language for dynamic client interactions and server-side logic.',
      },
      {
        name: 'TYPESCRIPT',
        image: 'images/assets/icons/ts-logo.png',
        description:
          'Static typing that catches bugs early and improves code readability.',
      },
      {
        name: 'TAILWIND',
        image: 'images/assets/icons/Tailwind_CSS_logo.png',
        description:
          'Utility-first CSS workflow for quickly crafting polished responsive layouts.',
      },
    ],
  },
  {
    title: 'Backend',
    tools: [
      {
        name: 'NODE',
        image: 'images/assets/icons/node_symbol.png',
        description:
          'JavaScript runtime that powers APIs, tooling, and full-stack backends.',
      },
      {
        name: 'PRISMA',
        image: 'images/assets/icons/Prisma_Prisma-IndigoSymbol_1.png',
        description:
          'Type-safe ORM for modeling data and querying databases with confidence.',
      },
      {
        name: 'POSTGRES',
        image: 'images/assets/icons/PostgreSQL_logo.png',
        description:
          'Reliable relational database built for robust and scalable applications.',
      },
    ],
  },
  {
    title: 'DevOps/Tools',
    tools: [],
  },
]

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
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        layout: { duration: 0.6, ease: 'easeInOut' },
        opacity: { duration: 0.45 },
        y: { duration: 0.45 },
      }}
      type="button"
      aria-pressed={isActive}
      aria-label={`${tool.name}: ${tool.description}`}
      onClick={onToggle}
      className={`group/toolcard relative min-h-52.5 w-full overflow-hidden border text-left transition-colors duration-500 ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-primary hover:text-primary-foreground bg-white'
      }`}
    >
      <p className="absolute top-3 left-3 z-20 rotate-180 tracking-[0.3em] [writing-mode:vertical-rl]">
        {tool.name}
      </p>

      {tool.image && (
        <img
          src={tool.image}
          alt={tool.name}
          className={`pointer-events-none absolute top-1/2 left-1/2 h-auto max-w-4/5 -translate-x-1/2 -translate-y-1/2 object-contain p-12 transition-opacity duration-500 ${
            isActive
              ? 'opacity-0'
              : 'opacity-100 group-hover/toolcard:opacity-0'
          }`}
        />
      )}

      <p
        className={`text-primary-foreground pointer-events-none absolute inset-y-0 right-0 left-5 flex items-center justify-center px-6 text-center leading-relaxed transition-opacity duration-500 ${
          isActive
            ? 'opacity-100'
            : 'opacity-0 group-hover/toolcard:opacity-100'
        }`}
      >
        {tool.description}
      </p>
    </motion.button>
  )
}

export default function TechSection() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  return (
    <section>
      <div className="container">
        <div className="mb-24">
          <h2 className="relative mb-2 text-6xl font-bold tracking-tight md:text-7xl">
            Tools of the trade
            <div
              aria-hidden="true"
              className="bg-secondary absolute top-1/2 left-[0.5ch] -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2"
            />
          </h2>
          <p className="isolate max-w-2xl">
            I’m a firm believer in using the right tool for the job. My stack is
            built around a modern developer experience and a "ship fast"
            mentality. From front-end finesse to back-end stability, I leverage
            these technologies to build seamless, full-stack experiences without
            the bloat.
          </p>
        </div>

        {toolCategories.map((category, index) => (
          <div key={category.title}>
            <Accordion title={category.title} index={index}>
              {category.tools.length > 0 ? (
                <motion.div
                  layout
                  className="mb-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4"
                >
                  {category.tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
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
                <p className="text-muted-foreground">Coming soon.</p>
              )}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  )
}
