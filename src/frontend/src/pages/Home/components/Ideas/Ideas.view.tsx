import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

// test data
import data from './Ideas.data.json'

import Carousel from '../../../../app/App.components/Carousel/Carousel.view'

// prettier-ignore
import { IdeasFigure, IdeasSection, IdeasCarouselWrap, IdeasGroupSection, IdeaLink } from './Ideas.style'
import { group } from 'console'

const chunkArrayInGroups = (arr: Record<string, string | number>[], size: number) => {
  var myArray = []
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size))
  }
  return myArray
}

export const IdeasView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const frontImgUrl = darkThemeEnabled ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'

  console.log('%c ||||| data', 'color:yellowgreen', data)

  const groupedData = chunkArrayInGroups(data, 6)

  console.log('%c ||||| groupedData', 'color:yellowgreen', groupedData)

  // will be Ideas
  return (
    <IdeasSection>
      <h2>Ideas</h2>
      <IdeasCarouselWrap>
        <Carousel>
          {groupedData.map((group, i) => (
            <IdeasGroupSection key={i}>
              {group.map((item) => (
                <IdeaLink key={item.id}>
                  <img src="https://miro.medium.com/max/700/1*PF-l6bSvZGdDA97dtpBbfA.png" alt="" />
                </IdeaLink>
              ))}
            </IdeasGroupSection>
          ))}
        </Carousel>
      </IdeasCarouselWrap>

      <IdeasFigure>
        <img loading="lazy" src={frontImgUrl} alt="Subscribe" />
      </IdeasFigure>
    </IdeasSection>
  )
}
