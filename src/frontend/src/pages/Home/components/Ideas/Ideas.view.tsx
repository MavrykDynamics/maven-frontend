import { group } from 'console'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Carousel from '../../../../app/App.components/Carousel/Carousel.view'
import useGetMediumFeed from '../../../../hooks/useGetMediumFeed'
// hooks
import useMediaQuery from '../../../../hooks/useMediaQuery'
// test data
import data from './Ideas.data.json'
// prettier-ignore
import { IdeaLink, IdeaLoading, IdeasCarouselWrap, IdeasFigure, IdeasGroupSection, IdeasSection } from './Ideas.style'

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
  const loadingImgUrl = darkThemeEnabled ? '/icons/loading-white.svg' : '/icons/loading.svg'

  // console.log('%c ||||| data', 'color:yellowgreen', data)
  const isMiddleScreen = useMediaQuery('(max-width: 1280px)')
  const isPhone = useMediaQuery('(max-width: 850px)')
  const { loading, mediumFeedData } = useGetMediumFeed()

  console.log('%c ||||| mediumFeedData', 'color:yellowgreen', mediumFeedData)
  const chunkAmount = isPhone ? 1 : isMiddleScreen ? 4 : 6
  const groupedData = chunkArrayInGroups(data, chunkAmount)

  // will be Ideas
  return (
    <IdeasSection>
      <h2>Ideas</h2>
      {loading ? (
        <IdeaLoading>
          <img src={loadingImgUrl} />
        </IdeaLoading>
      ) : (
        <IdeasCarouselWrap>
          <Carousel>
            {groupedData.map((group, i) => (
              <IdeasGroupSection key={i}>
                {group.map((item) => (
                  <IdeaLink
                    href="https://blogs.mavryk.finance/welcome-to-mavryk-finance-54bbf7b101ed"
                    target="_blank"
                    key={item.id}
                  >
                    <img src="https://miro.medium.com/max/700/1*PF-l6bSvZGdDA97dtpBbfA.png" alt="" />
                    <figcaption>
                      <h3>Title A</h3>
                      <p>
                        It is in the DAO’s best interest to define and deliver on a model that activates more
                        substantial grants appropriately while maintaining decentralized protocol management.It is in
                        the DAO’s best interest to define and deliver on a model that activates more substantial grants
                        appropriately while maintaining decentralized protocol management.
                      </p>
                    </figcaption>
                  </IdeaLink>
                ))}
              </IdeasGroupSection>
            ))}
          </Carousel>
        </IdeasCarouselWrap>
      )}

      <IdeasFigure>
        <img src={frontImgUrl} alt="Subscribe" />
      </IdeasFigure>
    </IdeasSection>
  )
}
