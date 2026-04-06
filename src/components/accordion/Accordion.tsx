const ToggleIcon = () => (
  <span className="border-primary/70 text-primary group-open:bg-primary group-open:text-primary-foreground relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200">
    <span className="absolute h-0.5 w-3 rounded bg-current" />
    <span className="absolute h-3 w-0.5 rounded bg-current transition-opacity duration-200 group-open:opacity-0" />
  </span>
)

export default function Accordion({
  title,
  children,
  index,
}: {
  title: string
  children: React.ReactNode
  index: number
}) {
  return (
    <details className="group w-full" key={index} open={index === 0}>
      <summary className="mb-6 flex cursor-pointer items-center gap-4">
        <ToggleIcon />
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h3>
      </summary>
      {children}
    </details>
  )
}
