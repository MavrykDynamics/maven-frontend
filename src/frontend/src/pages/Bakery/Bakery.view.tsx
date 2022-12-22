// components
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.view'
import { DelegateCard } from './components/DelegateCard.view'
import { Description } from './components/Description.view'

// helpers
import { bakeryData, delegationCardData } from './BakeryData'
import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'

// types

// styles
import { BakeryStyled, Card, CardWithBackground, ButtonStyled } from "./Bakery.style"

export function BakeryView () {
  const handleClickDelegate = () => {

  }

  return (
    <BakeryStyled>
      <div className='main-content'>
        <CardWithBackground>
          <h1>Delegate your Tezos</h1>
          <Description list={bakeryData.delegateYourTezos} className='paragraph-max-width' />
        </CardWithBackground>

        <div className='grid-two-columns'>
          {delegationCardData.map(({id, ...item}) => (
            <DelegateCard
              key={id}
              onClick={handleClickDelegate}
              {...item}
            />
          ))}
        </div>

        <Card className='grid-two-columns grid-column-gap'>
          <div>
            <h1>Delegation & Staking 101</h1>
            <Description list={bakeryData.delegationAndStaking101} />

            <a
              href=''
              target="_blank"
              rel="noreferrer"
            >
              Read more about staking here
            </a>
          </div>

          <div className='space-between-vertical'>
            <div>
              <h1>How to delegate and receive rewards</h1>
              <Description list={bakeryData.howToDelegateAndReceiveRewards} />
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
