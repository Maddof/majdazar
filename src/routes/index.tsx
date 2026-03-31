import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <main className="bg-background text-foreground min-h-screen">
        <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary">Available for freelance & junior roles</Badge>

            <div className="space-y-4">
              <p className="text-muted text-sm">Hi, I’m Majd</p>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                I build modern web applications with React, TypeScript, and full-stack tools.
              </h1>

              <p className="text-muted-foreground max-w-2xl text-base leading-7 md:text-lg">
                This is my personal portfolio where I share selected projects, my stack, and a bit
                about how I approach building products.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className={buttonVariants({ variant: 'default', size: 'sm' })}>
                View Projects
              </Link>

              <Link to="/design" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                View UI Playground
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
