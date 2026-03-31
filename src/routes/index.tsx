import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '~/components/ui/button'
import SignatureM from '~/components/hero/Signature'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <section className="relative flex min-h-[55dvh] w-full flex-col gap-12 bg-[url('/images/hero/majd-azar_hero-1.webp')] bg-cover bg-position-[80%_0%] text-white sm:min-h-dvh">
        <div className="container flex h-full flex-1 items-center">
          {/* Overlay absolute */}
          <div className="from-primary/60 to-primary/0 absolute inset-0 z-10 bg-linear-to-r" />
          <div className="z-20 flex flex-col items-start gap-3">
            <img
              src="/images/assets/Vector_stroke.svg"
              alt="Majd Azar Full Name"
              className="h-28 w-auto"
            />
            <SignatureM />
            <h1>Majd Azar</h1>
            <p className="text-[150%]">Full-stack Dev | Founder @ Smokify</p>

            <p className="max-w-xl text-[120%] leading-7">Stockholm, Sweden.</p>

            {/* <div className="flex flex-wrap gap-3">
              <Link to="/projects" className={buttonVariants({ variant: 'default' })}>
                View Projects
              </Link>

              <Link to="/design" className={buttonVariants({ variant: 'outline' }) + ' border-2'}>
                View UI Playground
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      <section className="flex min-h-screen w-full flex-col gap-12 px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl space-y-6">
          <h2>More about me</h2>

          <p className="text-muted-foreground max-w-2xl text-base leading-7 md:text-lg">
            I’m a full-stack developer with a passion for building products that solve real
            problems. I have experience working with a variety of technologies, including React,
            Node.js, and TypeScript. I’m currently focused on building my portfolio and looking for
            new opportunities to grow and learn.
          </p>
        </div>
      </section>
    </>
  )
}
