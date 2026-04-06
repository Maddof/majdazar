import type { ReactNode } from 'react'

type SectionIntroProps = {
  title: ReactNode
  subtitle?: ReactNode
  description: ReactNode
  className?: string
  showBackgroundAccent?: boolean
}

export default function SectionIntro({
  title,
  subtitle,
  description,
  className,
  showBackgroundAccent = true,
}: SectionIntroProps) {
  return (
    <div className={className}>
      <h2 className="relative mb-4">
        {title}
        {showBackgroundAccent ? (
          <div
            aria-hidden="true"
            // className="bg-secondary/80 absolute top-1/2 left-[0.5ch] -z-10 h-48 w-1/2 -translate-x-1/2 -translate-y-1/2"
            className="from-secondary to-background absolute top-1/2 left-[calc(50%-50vw)] -z-10 h-48 w-[calc(50vw)] -translate-y-1/2 bg-linear-to-r"
          />
        ) : null}
      </h2>
      {subtitle && <h3 className="mb-4">{subtitle}</h3>}
      <p className="isolate max-w-2xl">{description}</p>
    </div>
  )
}
