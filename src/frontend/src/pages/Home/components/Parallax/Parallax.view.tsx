import * as React from 'react'
import { useSelector } from 'react-redux'
import { ParallaxBanner } from 'react-scroll-parallax'

import { JumbotronView } from '../Jumbotron/Jumbotron.view'
import { ParallaxDesktop, ParallaxGroup, ParallaxLayer, ParallaxStyled } from './Parallax.style'

export const ParallaxView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
  const folder = "/images/parallax/" + (darkThemeEnabled ? "dark" : "light")

  return (
    <ParallaxStyled>
      <ParallaxDesktop>
        <ParallaxBanner
            layers={[
              {
                image: folder+'/layer10.svg',
                translateY: [-80, 80],
                expanded: false
              },
              {
                image: folder+'/layer8.svg',
                translateY: [-70, 70],
                expanded: false
              },
              {
                image: folder+'/layer7.svg',
                translateY: [-60, 60],
                expanded: false
              },
              {
                image: folder+'/layer6.svg',
                translateY: [-50, 50],
                expanded: false
              },
              {
                image: folder+'/layer5.svg',
                translateY: [-40, 40],
                expanded: false
              },
              {
                image: folder+'/layer4.svg',
                translateY: [-30, 30],
                expanded: false
              },
              {
                image: folder+'/layer3.svg',
                translateY: [-20, 20],
                expanded: false
              },
              {
                image: folder+'/layer2.svg',
                translateY: [-15, 15],
                expanded: false
              },
              {
                image: folder+'/layer1.svg',
                translateY: [0, 0],
                expanded: false
              }
            ]}
            style={{'paddingBottom': '200px'}}
          >
            <JumbotronView />
        </ParallaxBanner>
      </ParallaxDesktop>
        <ParallaxGroup>
          <ParallaxLayer img={folder+"/layer10.svg"} zIndex={1} translateZ="-800px" scale={3.75}/>
          <ParallaxLayer img={folder+"/layer8.svg"} zIndex={2} translateZ="-725px" scale={3.50}/>
          <ParallaxLayer img={folder+"/layer7.svg"} zIndex={3} translateZ="-675px" scale={3.25}/>
          <ParallaxLayer img={folder+"/layer6.svg"} zIndex={4} translateZ="-600px" scale={3}/>
          <ParallaxLayer img={folder+"/layer5.svg"} zIndex={5} translateZ="-525px" scale={2.75}/>
          <ParallaxLayer img={folder+"/layer4.svg"} zIndex={6} translateZ="-400px" scale={2.33333333}/>
          <ParallaxLayer img={folder+"/layer3.svg"} zIndex={7} translateZ="-250px" scale={1.833333333}/>
          <ParallaxLayer img={folder+"/layer2.svg"} zIndex={8} translateZ="-125px" scale={1.4167}/>
          <ParallaxLayer img={folder+"/layer1.svg"} zIndex={9} translateZ="0" scale={1.01}>
            <JumbotronView />
          </ParallaxLayer>
        </ParallaxGroup>
    </ParallaxStyled>
  )
}
