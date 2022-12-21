// components
import Icon from 'app/App.components/Icon/Icon.view'

// helpers
import { hardcodeText } from './Bakery.consts'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'
import { CYAN } from 'app/App.components/TzAddress/TzAddress.constants'
import { ACTION_PRIMARY, ACTION_SECONDARY } from 'app/App.components/Button/Button.constants'

// types

// styles
import { BakeryStyled, Card, CardWithBackground, MiniCard, ButtonStyled, RoundButton } from "./Bakery.style"

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
          <div className='space-between'>
            <h1>Mavryk DAO Bakery</h1>

            <RoundButton
              className={ACTION_SECONDARY}
              href="https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
              target="_blank"
              rel="noreferrer"
            >
              <Icon id='plusDark' />
            </RoundButton>
          </div>

          <p>{hardcodeText.mavrykDAOBakery}</p>

          <div className='address'>
            <span>Bakery Address</span>
            &nbsp;
            <TzAddress type={CYAN} tzAddress={hardcodeText.tzAddress} hasIcon />
          </div>

          <div className='grid-three-columns'>
            <MiniCard>
              <Icon id='threeCoins' />
              <h4>Rewards</h4>
              <span>5-6%</span>
            </MiniCard>

            <MiniCard>
              <Icon id='coinHand' />
              <h4>Commission</h4>
              <span>5%</span>
            </MiniCard>
            
            <MiniCard>
              <Icon id='planet' />
              <h4>Available XTZ Space</h4>
              <span>~ 3 days</span>
            </MiniCard>
          </div>

          <div className='centring-wrapper'>
            <ButtonStyled
              text='Delegate to the DAO'
              icon='plusDark'
              kind={ACTION_SECONDARY}
            />
          </div>
        </Card>
        <Card>
          <div className='space-between'>
            <h1>Mavryk Dynamics Bakery</h1>

            <RoundButton
              className={ACTION_PRIMARY} 
              href="https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
              target="_blank"
              rel="noreferrer"
            >
              <Icon id='plusDark' />
            </RoundButton>
          </div>

          <p>{hardcodeText.mavrykDynamicsBakery}</p>

          <div className='address'>
            <span>Bakery Address</span>
            &nbsp;
            <TzAddress type={CYAN} tzAddress={hardcodeText.tzAddress} hasIcon />
          </div>

          <div className='grid-three-columns'>
            <MiniCard>
              <Icon id='threeCoins' />
              <h4>Rewards</h4>
              <span>5-6%</span>
            </MiniCard>

            <MiniCard>
              <Icon id='coinHand' />
              <h4>Commission</h4>
              <span>5%</span>
            </MiniCard>

            <MiniCard>
              <Icon id='planet' />
              <h4>Available XTZ Space</h4>
              <span>~ 3 days</span>
            </MiniCard>
          </div>

          <div className='centring-wrapper'>
            <ButtonStyled
              text='Delegate to Mavryk Dynamics'
              icon='plusDark'
              kind={ACTION_PRIMARY}
            />
          </div>
        </Card>
      </div>
    </BakeryStyled>
  )
}
