import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

import './styles.css'

// import required modules
import { EffectCards } from 'swiper/modules'

export function ProjectCards() {
  return (
    <Swiper
      effect={'cards'}
      modules={[EffectCards]}
      grabCursor={true}
      initialSlide={1}
      cardsEffect={{
        perSlideRotate: 8,
        perSlideOffset: 4,
        slideShadows: true,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <div id="portfolio-card-1">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div id="portfolio-card-2">Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div id="portfolio-card-3">Slide 3</div>
      </SwiperSlide>
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
