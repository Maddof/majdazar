const tools = [
  {
    name: 'NEXT',
    type: 'image',
    image: '/logos/nextjs.png',
  },
  {
    name: 'REACT',
    type: 'image',
    image: '/logos/react.png',
  },
  {
    name: 'TANSTACK',
    type: 'text',
    dark: true,
    description:
      'Utility-first CSS framework for building clean, responsive interfaces quickly without leaving your markup.',
  },
  {
    name: 'JAVASCRIPT',
    type: 'image',
    image: '/logos/javascript.png',
  },
  {
    name: 'TYPESCRIPT',
    type: 'image',
    image: '/logos/typescript.png',
  },
  {
    name: 'PRISMA',
    type: 'image',
    image: '/logos/prisma.png',
  },
  {
    name: 'POSTGRES',
    type: 'image',
    image: '/logos/postgres.png',
  },
  {
    name: 'TAILWIND',
    type: 'image',
    image: '/logos/tailwind.png',
  },
  {
    name: 'NODE',
    type: 'image',
    image: '/logos/node.png',
  },
]

function ToolCard({ tool }) {
  return (
    <div
      className={`relative h-[210px] w-full overflow-hidden ${
        tool.dark ? 'bg-slate-800 text-white' : 'bg-zinc-100 text-black'
      }`}
    >
      <div className="absolute top-3 left-3 rotate-180 text-[18px] tracking-[0.3em] [writing-mode:vertical-rl]">
        {tool.name}
      </div>

      <div className="flex h-full items-center justify-center px-12">
        {tool.type === 'image' ? (
          <img
            src={tool.image}
            alt={tool.name}
            className="max-h-[110px] max-w-[140px] object-contain"
          />
        ) : (
          <p className="max-w-[220px] text-center text-[18px] leading-relaxed">
            {tool.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default function TechSection() {
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

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
