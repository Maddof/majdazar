import type { ReactNode } from 'react'

type SectionIntroProps = {
  title: ReactNode
  description: ReactNode
  className?: string
  showBackgroundAccent?: boolean
}

export default function SectionIntro({
  title,
  description,
  className,
  showBackgroundAccent = true,
}: SectionIntroProps) {
  return (
    <div className={className}>
      <h2 className="relative mb-2">
        {title}
        {showBackgroundAccent ? (
          <div
            aria-hidden="true"
            className="bg-secondary absolute top-1/2 left-[0.5ch] -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2"
          />
        ) : null}
      </h2>

      <p className="isolate max-w-2xl">{description}</p>
    </div>
  )
}
