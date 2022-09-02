import * as React from 'react'
import { Parallax } from 'react-scroll-parallax'
import { useSelector } from 'react-redux'

import {
  GovernanceContent,
  GovernanceImage,
  GovernanceStyled,
  GovernanceGrid,
  GovernanceList,
  GovernanceImagePlanet,
  GovernanceParallaxLayer,
} from './Governance.style'
import { DARK_THEME } from 'redux/actions/preferences.action'
import { State } from 'utils/interfaces'

export const GovernanceView = () => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const planetUrl =
    themeSelected === DARK_THEME ? '/images/governance/planet-dark.svg' : '/images/governance/planet-light.svg'

  return (
    <GovernanceStyled>
      <GovernanceContent>
        <h1>Cycle of Governance & Oracle</h1>
        <GovernanceGrid>
          <GovernanceParallaxLayer zIndex={1}>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance1.svg" />
              <h4>Take a loan out</h4>
            </Parallax>
          </GovernanceParallaxLayer>
          <Parallax speed={-5}>
            <GovernanceImage img="/images/governance/arrow1.svg" backgroundSize="auto" />
          </Parallax>
          <GovernanceParallaxLayer zIndex={1}>
            <Parallax speed={5}>
              <GovernanceImage img="/images/governance/governance2.svg" />
              <h4>Deposit tokens into Yield Farms (DSR)</h4>
            </Parallax>
          </GovernanceParallaxLayer>
          <Parallax speed={-5}>
            <GovernanceImage img="/images/governance/arrow4.svg" backgroundSize="auto" height="150px" />
          </Parallax>
          <Parallax speed={-10}>
            <GovernanceImagePlanet img={planetUrl} height="400px" />
          </Parallax>
          <Parallax speed={-5}>
            <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize="auto" height="150px" />
          </Parallax>
          <Parallax speed={5}>
            <GovernanceImage img="/images/governance/governance3.svg" />
            <h4>Earn MVK rewards</h4>
          </Parallax>
          <Parallax speed={-5} scale={[1.15, 1.15]}>
            <GovernanceImage img="/images/governance/arrow3.svg" backgroundSize="auto" translateY="70px" />
          </Parallax>
          <Parallax speed={5}>
            <GovernanceImage img="/images/governance/governance4.svg" />
            <h4>Delegate MVK to a Satellite (locked value stays secure)</h4>
          </Parallax>
        </GovernanceGrid>
        <GovernanceList>
          <GovernanceImage img="/images/governance/governance1.svg" />
          <h4>Take a loan out</h4>
          <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize="auto" />
          <GovernanceImage img="/images/governance/governance2.svg" />
          <h4>Deposit tokens into Yield Farms (DSR)</h4>
          <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize="auto" />
          <GovernanceImage img="/images/governance/governance3.svg" />
          <h4>Earn MVK rewards</h4>
          <GovernanceImage img="/images/governance/arrow2.svg" backgroundSize="auto" />
          <GovernanceImage img="/images/governance/governance4.svg" />
          <h4>Delegate MVK to a Satellite (locked value stays secure)</h4>
        </GovernanceList>
      </GovernanceContent>
    </GovernanceStyled>
  )
}
