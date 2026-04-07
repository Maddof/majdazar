import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

import './styles.css'
import { useRef } from 'react'

// import required modules
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import { Link } from '@tanstack/react-router'

type CaseStudy = {
  techniques: { name: string; description: string }[]
  challenges: string
  liveSiteLink: string
  finalThoughts: string
}

type PortfolioCardProps = {
  id: string
  title: string
  imageUrl: string
  caseStudy: CaseStudy
}

function PortfolioCard({ id, title, imageUrl, caseStudy }: PortfolioCardProps) {
  const closeCaseStudyButtonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <div
      id={id}
      className="relative flex h-full w-full items-start justify-start bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute inset-0 z-10 bg-linear-to-br from-black/30 to-black/0" />
      {/* <div className="absolute inset-0 z-10 bg-linear-to-t from-black/10 to-black/0" /> */}
      <h2 className="z-30 -ml-2 text-center text-[125%] font-black -tracking-widest uppercase opacity-90 [text-orientation:upright] [writing-mode:vertical-lr] sm:text-[155%]">
        {title}
      </h2>
      <Link
        to={caseStudy.liveSiteLink}
        target="_blank"
        className="bg-primary absolute right-3 bottom-3 z-30 border border-white/75 p-2 text-sm font-semibold tracking-widest text-white uppercase opacity-95 transition-opacity hover:opacity-100"
      >
        Visit site
      </Link>
      <div className="bg-primary/75 absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center border-y border-white/75">
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="ghost"
                className="text-base font-bold tracking-widest hover:text-white"
              >
                View case study
              </Button>
            }
          ></DialogTrigger>
          <DialogContent
            className={`bg-cover bg-top text-white sm:max-h-[80dvh] sm:min-h-[70dvh] sm:min-w-[60dvw]`}
            style={{ backgroundImage: `url('${imageUrl}')` }}
            showCloseButton={false}
            initialFocus={closeCaseStudyButtonRef}
          >
            <div className="bg-primary/50 pointer-events-none absolute inset-0" />
            <div className="from-primary via-primary/90 pointer-events-none absolute inset-0 bg-linear-to-tr to-transparent" />

            <DialogHeader>
              <DialogTitle className="z-10 text-2xl font-bold tracking-widest text-white uppercase">
                {title} Case Study
              </DialogTitle>
              <DialogDescription className="z-10 mt-4 text-base text-white">
                {/* Case study content goes here */}
                <div className="scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                  <div className="flex max-w-[50ch] flex-col gap-4">
                    <h3>Techniques used</h3>
                    <ul className="list-disc pl-6">
                      {caseStudy.techniques.map((technique, i) => (
                        <li key={i} className="mb-1">
                          <strong>{technique.name}:</strong>{' '}
                          {technique.description}
                        </li>
                      ))}
                    </ul>
                    <h3>Challenges faced</h3>
                    <p>{caseStudy.challenges}</p>
                    <h3>Final thoughts</h3>
                    <p>{caseStudy.finalThoughts}</p>
                    <h3>Link to live site</h3>
                    <Link
                      to={caseStudy.liveSiteLink}
                      className="underline underline-offset-4"
                      target="_blank"
                    >
                      Visit {title}
                    </Link>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="z-10 mt-auto text-white">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="text-white hover:text-white/80"
                    ref={closeCaseStudyButtonRef}
                    id="close-case-study-button"
                  >
                    Close
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export function ProjectCards() {
  const projects = [
    {
      id: 'portfolio-card-1',
      title: 'Portfolio',
      imageUrl: '/images/homepage/portfolio-site_screenshot_3x4.webp',
      caseStudy: {
        techniques: [
          {
            name: 'TanStack Start & Router',
            description:
              'File-based routing with type-safe navigation, loaders, and full-stack server functions — no separate backend needed.',
          },
          {
            name: 'React 19 & Tailwind CSS v4',
            description:
              'Component-driven UI with utility-first styling, CSS custom properties, and responsive design throughout.',
          },
          {
            name: 'Swiper.js + Base UI + shadcn/ui',
            description:
              'Accessible, composable primitives for interactive elements like dialogs, accordions, and this card carousel.',
          },
          {
            name: 'Framer Motion',
            description:
              'Subtle animations and transitions to add life to page elements without sacrificing performance.',
          },
          {
            name: 'Vite',
            description:
              'Fast dev server and optimised production builds with tree-shaking and code splitting.',
          },
        ],
        challenges:
          'Balancing personality with professionalism was the core design challenge. The site needed to feel like me — opinionated and direct — while still communicating clearly to potential clients and employers. Getting the file-based routing, SSR, and client-side transitions to feel seamless with TanStack Start also required careful thought around loader patterns and prefetching.',
        liveSiteLink: '/',
        finalThoughts:
          'Building your own portfolio is one of those projects that never truly feels "done" — there is always something to refine. I specifically wanted this site to showcase some cool animations and demonstrate my front-end skills in a way that feels intentional, not gimmicky. That tension turned out to be the most valuable part of the process. Every decision, from typography to routing to component architecture, was a chance to sharpen my opinions and practise deliberate craft. This site is the closest thing I have to a living document of how I think about building for the web.',
      },
    },
    {
      id: 'portfolio-card-2',
      title: 'Smokify',
      imageUrl: '/images/homepage/smokify_screenshot_3x4.webp',
      caseStudy: {
        techniques: [
          {
            name: 'Next.js 16 + React 19 (front-end)',
            description:
              'App Router with server components, Stripe Checkout integration, Google reCAPTCHA v3 for bot protection, QR code generation, and Framer Motion for animated UI transitions.',
          },
          {
            name: 'Express v5 + Prisma ORM (backend)',
            description:
              'RESTful API with PostgreSQL via Prisma, JWT-based auth, bcryptjs password hashing, Multer for file uploads, OpenAI for AI-powered features, Brevo for transactional email, and Stripe for payment webhooks.',
          },
          {
            name: 'Security-first backend',
            description:
              'Helmet for secure HTTP headers, CORS policy, express-rate-limit to prevent abuse, express-validator + Zod for input validation, and DOMPurify + jsdom for server-side HTML sanitisation.',
          },
          {
            name: 'Vite + TanStack Router (admin dashboard)',
            description:
              'File-based routing, TanStack Table for data-heavy views, TinyMCE rich text editor, React Hook Form + Zod for validated forms, React Dropzone for media uploads, and Sonner for toast notifications.',
          },
          {
            name: 'Monorepo architecture',
            description:
              'Three independent repos — customer-facing storefront, REST API, and internal admin dashboard — each with its own deployment pipeline and clear separation of concerns.',
          },
          {
            name: 'Stripe subscription billing',
            description:
              'Integrated Stripes subscription APIs with custom proration logic, trial periods, and webhook handling for a seamless recurring payment experience.',
          },
          {
            name: 'Swedish BankID auth',
            description:
              'Implemented BankID login flow with secure token exchange, session management.',
          },
        ],
        challenges:
          'Keeping three codebases in sync without shared types was the biggest ongoing friction. API contracts between the backend and both clients had to be maintained manually, which led to subtle bugs at the boundaries. Implementing a secure, stateless auth flow across the storefront and admin dashboard — with short-lived JWTs and Swedish BankID, refresh tokens via httpOnly cookies, and proper CORS — required careful coordination. Stripe webhook verification and idempotency also demanded more rigour than expected. Subscription billing with Stripe was another area that revealed edge cases around proration, subscription management, failed payments, and customer churn that needed to be handled gracefully.',
        liveSiteLink: 'https://smokify.se',
        finalThoughts:
          'Smokify taught me what it actually means to own a full stack. Every layer — from database schema to payment flows to UI — had real consequences, and there was no abstraction to hide behind. Splitting into three repos was the right call for separation of concerns, but it revealed how much invisible glue a monorepo or a shared type layer provides. The project also deepened my appreciation for the complexities of running a real business — handling customer support, managing deployments, and iterating on features based on user feedback were all new challenges that required a different mindset than building for clients or open source. It was a crash course in what it means to build something people rely on every day, and I learned more from the inevitable mistakes than from any tutorial or course could have taught me.',
      },
    },
    {
      id: 'portfolio-card-3',
      title: 'Vali',
      imageUrl: '/images/homepage/vali_screenshot_3x4.webp',
      caseStudy: {
        techniques: [
          {
            name: 'WordPress & WooCommerce',
            description:
              'Fully custom theme built with Pinegrow — no page builder reliance — giving complete control over markup, performance, and visual design without unnecessary plugin overhead.',
          },
          {
            name: 'WPML multilingual',
            description:
              'Site translated into English, German, and Swedish, with WPML managing string translations, WooCommerce product data, and hreflang tags for correct SEO indexing per locale.',
          },
          {
            name: 'jQuery checkout customisation',
            description:
              "Bespoke checkout flow layered over WooCommerce's default, with jQuery handling dynamic UI updates, field validation, and UX improvements to the payment step.",
          },
          {
            name: 'Stripe & Klarna payments',
            description:
              'Dual payment provider integration giving customers the choice between card payments via Stripe and buy-now-pay-later via Klarna — important for the Scandinavian market.',
          },
          {
            name: 'Plugin-minimal architecture',
            description:
              'Deliberately kept the plugin footprint small to maintain site performance and reduce surface area for security vulnerabilities and update conflicts.',
          },
        ],
        challenges:
          'Making WPML and WooCommerce behave consistently across three languages was more involved than expected — translated product slugs, currency localisation, and email templates all needed individual attention. Customising the WooCommerce checkout without breaking the underlying hooks and filters required a careful reading of the WooCommerce action/filter reference. Coordinating Stripe and Klarna side by side also meant handling divergent webhook payloads and order state transitions correctly.',
        liveSiteLink: 'https://valicompany.com/sv/',
        finalThoughts:
          'Vali was a lesson in restraint. The temptation with WordPress is always to reach for a plugin, but the brief demanded performance and a tailored look — so almost everything was built from scratch. Working within WooCommerce\'s opinionated data model while still delivering a custom experience sharpened my understanding of how to extend — rather than fight — an established platform. It is also the project that taught me the most about internationalisation and what "supporting multiple languages" actually means end to end.',
      },
    },
  ]

  return (
    <Swiper
      effect={'cards'}
      modules={[EffectCards]}
      grabCursor={true}
      initialSlide={1}
      cardsEffect={{
        perSlideRotate: 10,
        perSlideOffset: 8,
        slideShadows: true,
      }}
      className="mySwiper"
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <PortfolioCard
            id={project.id}
            title={project.title}
            imageUrl={project.imageUrl}
            caseStudy={project.caseStudy}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
