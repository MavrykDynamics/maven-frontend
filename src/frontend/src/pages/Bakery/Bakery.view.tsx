import { useEffect, useState } from 'react'

// components
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.view'
import { DelegateCard } from './components/DelegateCard.view'
import { Description } from './components/Description.view'
import { TabItem } from 'app/App.components/SlidingTabButtons/SlidingTabButtons.controller'

// helpers
import { bakeryData, delegateCardData } from './BakeryData'
import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'
import { calcWithoutMu } from 'utils/utils'

// actions
import { getBakeryDelegateData, BakeryDelegateDataType } from './Bakery.actions'

// styles
import { BakeryStyled, Card, CardWithBackground, ButtonStyled } from "./Bakery.style"

const getFreeSpace = (data: BakeryDelegateDataType) => {
  const balance = data.balance
  const totalAmountOfSpace = balance * 9
  const freeSpace = totalAmountOfSpace - data.delegatedBalance
  const divededByMu = calcWithoutMu(freeSpace).toFixed(2)
  return [Number(divededByMu)]
}

const tabItems: TabItem[] = [...delegateCardData].reverse().map((item, index) => {
  return {
    text: item.shortTitle,
    id: index,
    active: index === delegateCardData.length - 1,
  }
})

export function BakeryView () {
  const [activeSliderTab, setActiveSliderTab] = useState(tabItems.length - 1)
  const [delegateData, setDelegateDate] = useState(delegateCardData)

  const handleClickDelegate = () => {

  }

  const handleTabClick = (id: number) => {
    setActiveSliderTab(id)
  }

  useEffect(() => {
    async function fetchData () {
      Promise.all([
        getBakeryDelegateData(delegateCardData[0].tzAddress),
        getBakeryDelegateData(delegateCardData[1].tzAddress)
      ]).then(values => {
        const updatedDelegateCardData = delegateCardData.map((item, index) => {
          return {
            ...item,
            availableXtzSpace: getFreeSpace(values[index]),
          }
        })

        setDelegateDate(updatedDelegateCardData)
      });
    }

    fetchData()
  }, [])

  return (
    <BakeryStyled>
      <div className='main-content'>
        <CardWithBackground>
          <h1>Delegate your Tezos</h1>
          <Description list={bakeryData.delegateYourTezos} className='paragraph-max-width' />
        </CardWithBackground>
  
        <div className='grid-two-columns desktop'>
          {delegateData.map(({id, ...item}) => (
            <DelegateCard
              key={id}
              onClick={handleClickDelegate}
              {...item}
            />
          ))}
        </div>

        <div className='mobile'>
          <DelegateCard
            onClick={handleClickDelegate}
            handleTabClick={handleTabClick}
            tabItems={tabItems}
            {...delegateData[activeSliderTab]}
          />
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
              <h1 className='media-margin-top-1'>How to delegate and receive rewards</h1>
              <Description list={bakeryData.howToDelegateAndReceiveRewards} />
            </div>

            <div className='centring-wrapper'>
              <ButtonStyled
                text='Delegate to Mavryk Dynamics'
                icon='plusDark'
                kind={ACTION_PRIMARY}
                className='media-margin-top-2'
              />
            </div>
          </div>
        </Card>

        <FrequentlyAskedQuestions />
      </div>
    </BakeryStyled>
  )
}
