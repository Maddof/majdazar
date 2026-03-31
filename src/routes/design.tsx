import { Separator } from '@base-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

export const Route = createFileRoute('/design')({
  component: DesignPage,
})

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  )
}

function Token({ label, className }: { label: string; className: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-xl border ${className}`} />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}

function DesignPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:px-8 md:py-14">
        <div className="space-y-3">
          <Badge variant="secondary">Design System</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">UI Playground</h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Use this page to preview buttons, inputs, typography, colors, and surface styles while
            building your portfolio.
          </p>
        </div>

        <Separator />

        <div className="grid gap-8">
          <Section
            title="Typography"
            description="Check your headings, paragraph styles, and muted text."
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
              <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
              <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
              <p className="max-w-3xl text-base leading-7">
                This is a standard paragraph. Use this area to see how your default reading width,
                font size, and line height feel in the browser.
              </p>
              <p className="text-muted-foreground text-sm">
                This is muted text for descriptions, labels, helper copy, and secondary content.
              </p>
            </div>
          </Section>

          <Section title="Buttons" description="Preview common button variants and sizes.">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Button</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </Section>

          <Section
            title="Inputs"
            description="Basic form controls for contact forms and admin-style inputs."
          >
            <div className="grid gap-4 md:max-w-xl">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Majd Azar" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="majd@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  className="min-h-32"
                />
              </div>
            </div>
          </Section>

          <Section
            title="Badges"
            description="Useful for project categories, stack tags, and availability."
          >
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Urgent</Badge>
            </div>
          </Section>

          <Section
            title="Cards"
            description="Try card surfaces for project previews and content blocks."
          >
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Portfolio Project</CardTitle>
                  <CardDescription>A featured project card example</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    TanStack Start, Strapi, Tailwind, and shadcn/ui.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                  <CardDescription>A simple informational surface</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Great for content previews and homepage sections.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Contact CTA</CardTitle>
                  <CardDescription>A call-to-action card example</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Get in touch</Button>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section
            title="Color Tokens"
            description="These reflect your semantic theme colors from app.css."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Token label="background" className="bg-background" />
              <Token label="foreground" className="bg-foreground" />
              <Token label="card" className="bg-card" />
              <Token label="popover" className="bg-popover" />
              <Token label="primary" className="bg-primary" />
              <Token label="secondary" className="bg-secondary" />
              <Token label="muted" className="bg-muted" />
              <Token label="accent" className="bg-accent" />
            </div>
          </Section>

          <Section
            title="Surface Preview"
            description="A quick mixed example of how pieces look together."
          >
            <div className="bg-card rounded-3xl border p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant="secondary">Frontend</Badge>
                <Badge variant="outline">Portfolio</Badge>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Building a modern portfolio with TanStack Start
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  This block helps you judge spacing, contrast, border radius, button styles, and
                  how your tokens work together on a real UI.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button>Primary action</Button>
                <Button variant="outline">Secondary action</Button>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </main>
  )
}
