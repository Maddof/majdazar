import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

import './styles.css'

// import required modules
import { EffectCards } from 'swiper/modules'
import { Button } from '../ui/button'

type PortfolioCardProps = {
  id: string
  title: string
  cardClassName?: string
}

function PortfolioCard({ id, title, cardClassName }: PortfolioCardProps) {
  return (
    <div
      id={id}
      className={`relative flex h-full w-full items-start justify-start p-4 ${cardClassName ?? ''}`}
    >
      <div className="absolute inset-0 z-10 bg-linear-to-br from-black/30 to-black/0" />
      {/* <div className="absolute inset-0 z-10 bg-linear-to-t from-black/10 to-black/0" /> */}
      <h2 className="z-30 -ml-2 text-left text-[155%] font-black tracking-tight uppercase [text-orientation:upright] [writing-mode:vertical-lr]">
        {title}
      </h2>
      <div className="absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center border-y border-white/75 bg-black/25">
        <Button
          variant="ghost"
          className="text-base font-bold tracking-widest hover:text-white"
        >
          Se fallstudie
        </Button>
      </div>
    </div>
  )
}

export function ProjectCards() {
  const slides = [
    {
      id: 'portfolio-card-1',
      title: 'Personal',
      cardClassName: '',
    },
    { id: 'portfolio-card-2', title: 'Vali', cardClassName: '' },
    { id: 'portfolio-card-3', title: 'Smokify', cardClassName: '' },
  ]

  return (
    <Swiper
      effect={'cards'}
      modules={[EffectCards]}
      grabCursor={true}
      initialSlide={2}
      cardsEffect={{
        perSlideRotate: 10,
        perSlideOffset: 8,
        slideShadows: true,
      }}
      className="mySwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <PortfolioCard
            id={slide.id}
            title={slide.title}
            cardClassName={slide.cardClassName}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    // <div
    //   id="portfolio-cards"
    //   className="mt-16 flex items-center justify-center"
    // >
    //   <div className="relative">
    //     <div
    //       id="portfolio-card-3"
    //       className="border-primary absolute inset-0 h-140 w-96 origin-bottom -rotate-16 border bg-amber-800 drop-shadow-md"
    //     ></div>
    //     <div
    //       id="portfolio-card-2"
    //       className="border-primary absolute inset-0 h-140 w-96 origin-bottom rotate-16 border bg-amber-600 drop-shadow-md"
    //     ></div>
    //     <div
    //       id="portfolio-card-1"
    //       className="border-primary relative h-140 w-96 border bg-amber-400 drop-shadow-md"
    //     ></div>
    //   </div>
    // </div>
  )
}
