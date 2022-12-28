import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UTCTimestamp } from 'lightweight-charts'

// components
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.view'
import { DelegateCard } from './components/DelegateCard.view'
import { Description } from './components/Description.view'
import { TabItem } from 'app/App.components/SlidingTabButtons/SlidingTabButtons.controller'
import { Chart } from 'app/App.components/Chart/Chart.view'

// helpers
import { bakeryData, delegateCardData } from './BakeryData'
import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'
import { calcWithoutMu } from 'utils/utils'

// actions
import { getBakeryDelegateData, BakeryDelegateDataType, delegation } from '../../redux/actions/bakery.action'

// styles
import { BakeryStyled, Card, CardWithBackground, ButtonStyled } from "./Bakery.style"

const chartData = [
  {
    "value": 100000000000,
    "time": new Date("2022-12-20T14:26:15+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 64997812677,
    "time": new Date ("2022-12-20T14:26:30+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 74997812677,
    "time": new Date ("2022-12-20T14:37:05+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 174997812677,
    "time": new Date ("2022-12-20T14:37:35+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 175007812677,
    "time": new Date ("2022-12-20T15:17:25+00:00").getTime() as UTCTimestamp,
  }
]

const getFreeSpace = (data: BakeryDelegateDataType) => {
  if (data.balance === -1) return [-1]

  const balance = data.balance
  const totalAmountOfSpace = balance * 9
  const freeSpace = totalAmountOfSpace - data.delegatedBalance
  const divededByMu = calcWithoutMu(freeSpace).toFixed(2)

  return [Number(divededByMu)]
}
  
const tabItems: TabItem[] = [...delegateCardData].reverse().map((item, index) => {
  return {
    text: item.shortTitle,
    id: item.id,
    active: index === 0,
  }
})

export function BakeryView () {
  const dispatch = useDispatch()

  const [activeSliderTab, setActiveSliderTab] = useState(tabItems[0].id)
  const [delegateData, setDelegateDate] = useState(delegateCardData)
  const delegateMobileData = delegateData.find((item) => item.id === activeSliderTab) || delegateData[activeSliderTab - 1]

  const handleClickDelegate = (bakerAddress: string) => {
    dispatch(delegation(bakerAddress))
  }

  const handleTabClick = (id: number) => {
    setActiveSliderTab(id)
  }

  useEffect(() => {
    function fetchData () {
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
      })
    }

    fetchData()
  }, [])

  return (
    <BakeryStyled>
      <div className='main-content'>
        <CardWithBackground>
          <h1>Delegate your Tezos</h1>
          <Description list={bakeryData.delegateYourTezos} className='paragraph-max-width' />

          <Chart
            data={chartData}
            colors={{
              lineColor: '#86D4C9',
              areaTopColor: '#86D4C9',
              areaBottomColor: 'rgba(119, 164, 242, 0)',
              textColor: '#CDCDCD',
              borderColor: 'transparent'
            }}
            settings={{
              height: 110,
              showTooltip: false,
            }}
            className='chart'
          />
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
            {...delegateMobileData}
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
                onClick={() => handleClickDelegate(delegateData[1].tzAddress)}
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
