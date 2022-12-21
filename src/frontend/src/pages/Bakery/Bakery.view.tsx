// components
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.view'
import { DelegateCard } from './components/DelegateCard.view'
import { Description } from './components/Description.view'

// helpers
import bakeryData from './Bakery.json'
import { ACTION_PRIMARY, ACTION_SECONDARY } from 'app/App.components/Button/Button.constants'

// types

// styles
import { BakeryStyled, Card, CardWithBackground, ButtonStyled } from "./Bakery.style"

export function BakeryView () {

  return (
    <BakeryStyled>
      <div className='main-content'>
        <CardWithBackground>
          <h1>Delegate your Tezos</h1>
          <Description list={bakeryData[0]} className='paragraph-max-width' />
        </CardWithBackground>

        <div className='grid-two-columns'>
          <DelegateCard
            title='Mavryk DAO Bakery'
            tzAddress='tz1ezDb77a9jaFMHDWs8QXrKEDkpgGdgsjPD'
            rewards={[5, 6]}
            commission={[5]}
            availableXtzSpace={[3]}
            onClick={() => {}}
            kind={ACTION_SECONDARY}
            link='https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/'
            description={bakeryData[1]}
          />

          <DelegateCard
            title='Mavryk Dynamics Bakery'
            tzAddress='tz1ezDb77a9jaFMHDWs8QXrKEDkpgGdgsjPD'
            rewards={[5, 6]}
            commission={[5]}
            availableXtzSpace={[3]}
            onClick={() => {}}
            kind={ACTION_PRIMARY}
            link='https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/'
            description={bakeryData[2]}
          />
        </div>

        <Card className='grid-two-columns grid-column-gap'>
          <div>
            <h1>Delegation & Staking 101</h1>
            <Description list={bakeryData[3]} />

            <a
              href=''
              target="_blank"
              rel="noreferrer"
            >
              Read more about staking her
            </a>
          </div>

          <div className='space-between-vertical'>
            <div>
              <h1>How to delegate and receive rewards</h1>
              <Description list={bakeryData[4]} />
            </div>

            <div className='centring-wrapper'>
              <ButtonStyled
                text='Delegate to Mavryk Dynamics'
                icon='plusDark'
                kind={ACTION_PRIMARY}
              />
            </div>
          </div>
        </Card>

        <FrequentlyAskedQuestions />
      </div>
    </BakeryStyled>
  )
}
