// components

// helpers
import { hardcodeText } from './Bakery.consts'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'
import { CYAN } from 'app/App.components/TzAddress/TzAddress.constants'

// types

// styles
import { BakeryStyled, Card, CardWithBackground, MiniCard } from "./Bakery.style"

export function BakeryView () {

  return (
    <BakeryStyled>

      <CardWithBackground>
        <h1>Delegate your Tezos</h1>

        <p className='paragraph-max-width'>{hardcodeText.delegateYourTezosP1}</p>
        <p className='paragraph-max-width'>{hardcodeText.delegateYourTezosP2}</p>
      </CardWithBackground>

      <div className='grid-two-columns'>
        <Card>
          <h1>Mavryk DAO Bakery</h1>
          <p>{hardcodeText.mavrykDAOBakery}</p>

          <div className='address'>
            <span>Bakery Address</span>
            &nbsp;
            <TzAddress type={CYAN} tzAddress={hardcodeText.tzAddress} hasIcon />
          </div>

          <div className='grid-three-columns'>
            <MiniCard>
              <h4>Rewards</h4>
              <span>5-6%</span>
            </MiniCard>
            <MiniCard>
              <h4>Commission</h4>
              <span>5%</span>
            </MiniCard>
            <MiniCard>
              <h4>Available XTZ Space</h4>
              <span>~ 3 days</span>
            </MiniCard>
          </div>
        </Card>
        <Card>
          <h1>Mavryk Dynamics Bakery</h1>
          <p>{hardcodeText.mavrykDynamicsBakery}</p>
        </Card>
      </div>
    </BakeryStyled>
  )
}
