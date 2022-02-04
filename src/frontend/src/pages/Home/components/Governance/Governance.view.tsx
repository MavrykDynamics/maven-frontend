import * as React from 'react'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'

import { GovernanceContent, GovernanceImage, GovernanceStyled, GovernanceGrid, GovernanceList } from './Governance.style'

export const GovernanceView = () => {
  return (
    <GovernanceStyled>
      <GovernanceContent>
        <h1>Cycle of Governance & Oracle</h1>
        {/* <ParallaxBanner
            layers={[
              {
                image: '/images/governance-cycle/governance-3.svg',
                translateY: [15,5, 'easeOutQuad'],
                // scale: [0.8,0.8],
              },
              {
                image: '/images/governance-cycle/governance-2.svg',
                // scale: [0.8,0.8],
              },
              {
                image: '/images/governance-cycle/governance-1.svg',
                translateY: [-15,-5, 'easeOutQuad'],
                // speed: -15,
                // scale: [0.8,0.8],
              }
            ]}
            style={{ aspectRatio: '1.8/1'}}
          /> */}
          <GovernanceGrid>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance1.svg"/>
              <h4>Take a loan out</h4>
            </Parallax>
            <Parallax speed={-10}>
              <GovernanceImage img="/images/governance/arrow1.svg" backgroundSize='auto'/>
            </Parallax>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance2.svg"/>
              <h4>Deposit tokens into Yield Farms (DSR)</h4>
            </Parallax>
            <Parallax speed={-10}>
              <GovernanceImage img="/images/governance/arrow4.svg" backgroundSize='auto' height='350px'/>
            </Parallax>
            <Parallax speed={-30}>
              <GovernanceImage img="/images/governance/planet.svg" height='350px'/>
            </Parallax>
            <Parallax speed={-10}>
              <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize='auto' height='350px'/>
            </Parallax>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance3.svg"/>
              <h4>Earn MVK rewards</h4>
            </Parallax>
            <Parallax speed={-10}>
              <GovernanceImage img="/images/governance/arrow3.svg" backgroundSize='auto'/>
            </Parallax>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance4.svg"/>
              <h4>Delegate MVK to a Satellite (locked value stays secure)</h4>
            </Parallax>
          </GovernanceGrid>
          <GovernanceList>
            <GovernanceImage img="/images/governance/governance1.svg"/>
            <h4>Take a loan out</h4>
            <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize='auto'/>
            <GovernanceImage img="/images/governance/governance2.svg"/>
            <h4>Deposit tokens into Yield Farms (DSR)</h4>
            <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize='auto'/>
            <GovernanceImage img="/images/governance/governance3.svg"/>
            <h4>Earn MVK rewards</h4>
            <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize='auto'/>
            <GovernanceImage img="/images/governance/governance4.svg"/>
            <h4>Delegate MVK to a Satellite (locked value stays secure)</h4>
          </GovernanceList>
      </GovernanceContent>
    </GovernanceStyled>
  )
}
