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
import type {
  ProjectContent,
  StrapiBlockNode,
  StrapiInlineNode,
} from '~/utils/strapi/projects'

// import required modules
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'

type PortfolioCardProps = {
  id: string
  title: string
  imageUrl: string
  liveLink?: string
  description: StrapiBlockNode[]
}

function renderInlineNode(node: StrapiInlineNode, key: string) {
  if (node.type === 'link') {
    return (
      <a
        key={key}
        href={node.url}
        target={node.target || '_blank'}
        rel="noreferrer"
        className="underline underline-offset-4"
      >
        {node.children.map((child, index) =>
          renderInlineNode(child, `${key}-${index}`),
        )}
      </a>
    )
  }

  let content = <>{node.text}</>

  if (node.code) {
    content = <code>{content}</code>
  }
  if (node.bold) {
    content = <strong>{content}</strong>
  }
  if (node.italic) {
    content = <em>{content}</em>
  }
  if (node.underline) {
    content = <span className="underline">{content}</span>
  }
  if (node.strikethrough) {
    content = <span className="line-through">{content}</span>
  }

  return <span key={key}>{content}</span>
}

function renderBlock(block: StrapiBlockNode, index: number) {
  const content = block.children.map((child, childIndex) =>
    renderInlineNode(child, `${index}-${childIndex}`),
  )

  if (block.type === 'heading') {
    const HeadingTag = block.level === 4 ? 'h4' : 'h3'

    return (
      <HeadingTag key={index} className="mt-6 text-lg font-bold first:mt-0">
        {content}
      </HeadingTag>
    )
  }

  return (
    <p key={index} className="leading-7">
      {content}
    </p>
  )
}

function PortfolioCard({
  id,
  title,
  imageUrl,
  liveLink,
  description,
}: PortfolioCardProps) {
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
      {liveLink ? (
        <a
          href={liveLink}
          target="_blank"
          rel="noreferrer"
          className="bg-primary absolute right-3 bottom-3 z-30 border border-white/75 p-2 text-sm font-semibold tracking-widest text-white uppercase opacity-95 transition-opacity hover:opacity-100"
        >
          Visit site
        </a>
      ) : null}
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
              <DialogDescription
                className="z-10 mt-4 text-base text-white"
                render={<div />}
              >
                <div className="scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                  <div className="flex max-w-[58ch] flex-col gap-4 text-white">
                    {description.length > 0 ? (
                      description.map((block, index) =>
                        renderBlock(block, index),
                      )
                    ) : (
                      <p>No case study content available yet.</p>
                    )}
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

export function ProjectCards({ projects }: { projects: ProjectContent[] }) {
  if (projects.length === 0) {
    return <p className="text-muted-foreground">No projects published yet.</p>
  }

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
        <SwiperSlide key={project.documentId}>
          <PortfolioCard
            id={`portfolio-card-${project.id}`}
            title={project.title}
            imageUrl={project.featuredImageUrl || ''}
            liveLink={project.liveLink}
            description={project.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
