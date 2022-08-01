import * as React from 'react'
import { useSelector } from 'react-redux'
import { ParallaxBanner } from 'react-scroll-parallax'
import { JsxAttribute } from 'typescript'

import { JumbotronView } from '../Jumbotron/Jumbotron.view'
import { ParallaxDesktop, ParallaxLayer, ParallaxStyled } from './Parallax.style'

export const ParallaxView = ({children, className}: {children?: JSX.Element,className ?: string}) => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const folder = '/images/parallax/' + (darkThemeEnabled ? 'dark' : 'light')

  return (
    <ParallaxStyled>
      <ParallaxDesktop className={className}>
        <ParallaxBanner
        
          layers={[
            {
              image: folder + '/layer10.svg',
              translateY: [0, 0],
              expanded: false,
            },
            {
              image: folder + '/layer8.svg',
              translateY: [-70, 70],
              expanded: false,
            },
            {
              image: folder + '/layer7.svg',
              translateY: [-60, 60],
              expanded: false,
            },
            {
              image: folder + '/layer6.svg',
              translateY: [-50, 50],
              expanded: false,
            },
            {
              image: folder + '/layer5.svg',
              translateY: [-40, 40],
              expanded: false,
            },
            {
              image: folder + '/layer4.svg',
              translateY: [-30, 30],
              expanded: false,
            },
            {
              image: folder + '/layer3.svg',
              translateY: [-20, 20],
              expanded: false,
            },
            {
              image: folder + '/layer2.svg',
              translateY: [-15, 15],
              expanded: false,
            },
            {
              image: folder + '/layer1.svg',
              translateY: [0, 0],
              expanded: false,
            },
          ]}
        >
          {children}
        </ParallaxBanner>
      </ParallaxDesktop>
    </ParallaxStyled>
  )
}
