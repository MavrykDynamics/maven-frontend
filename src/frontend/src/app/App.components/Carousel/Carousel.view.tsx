// import { mediaByIndex } from '../media'
// import { NextButton, PrevButton } from './EmblaCarouselButtons'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import './embla.css'

type Props = {
  children: React.ReactNode
}

const Carousel = (props: Props) => {
  const { children } = props
  const [viewportRef, embla] = useEmblaCarousel({ loop: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    embla.on('select', onSelect)
    onSelect()
  }, [embla, onSelect])

  const arrowIcon = (
    <svg>
      <use xlinkHref="/icons/sprites.svg#arrow" />
    </svg>
  )
  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">{children}</div>
      </div>
      <button className="embla__button embla__button--prev" onClick={scrollPrev} disabled={!prevBtnEnabled}>
        {arrowIcon}
      </button>
      <button className="embla__button embla__button--next" onClick={scrollNext} disabled={!nextBtnEnabled}>
        {arrowIcon}
      </button>
    </div>
  )
}

export default Carousel
