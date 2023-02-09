import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.view'
import { DelegateCard } from './components/DelegateCard.view'
import { Description } from './components/Description.view'
import { TabItem } from 'app/App.components/SlidingTabButtons/SlidingTabButtons.controller'
import { BakeryChart } from './components/BakeryChart.view'

// helpers
import { bakeryData, delegateCardData } from './BakeryData'
import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'

// actions
import { getDelegates, delegation } from '../../redux/actions/bakery.action'
import { getTezosHistoryPrices } from 'redux/actions/tokenPrices.action'

// styles
import { BakeryStyled, Card, CardWithBackground, ButtonStyled } from './Bakery.style'

// types
import { State } from 'utils/interfaces'

const tabItems: TabItem[] = [...delegateCardData].reverse().map((item, index) => {
  return {
    text: item.shortTitle,
    id: item.id,
    active: index === 0,
  }
})

export function BakeryView() {
  const dispatch = useDispatch()

  const {
    coinHistoryPrices: { tezos },
  } = useSelector((state: State) => state.tokens)
  const { delegates } = useSelector((state: State) => state.bakery)
  const { accountPkh } = useSelector((state: State) => state.wallet)

  const [activeSliderTab, setActiveSliderTab] = useState(tabItems[0].id)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

  const delegateMobileData = delegates.find((item) => item.id === activeSliderTab) || delegates[activeSliderTab - 1]

  const handleClickDelegate = (bakerAddress: string) => {
    dispatch(delegation(bakerAddress, setTimerId))
  }

  const handleTabClick = (id: number) => {
    setActiveSliderTab(id)
  }

  const clearDelegationTimer = useCallback((id: any) => {
    if (!id) return
    clearTimeout(id)
  }, [])

  useEffect(() => {
    return clearDelegationTimer(timerId)
  }, [timerId, clearDelegationTimer])

  useEffect(() => {
    dispatch(getTezosHistoryPrices())
  }, [dispatch])

  useEffect(() => {
    dispatch(getDelegates())
  }, [accountPkh, dispatch])

  return (
    <BakeryStyled>
      <div className="main-content">
        <CardWithBackground>
          <h1>Delegate your Tezos</h1>
          <Description list={bakeryData.delegateYourTezos} className="paragraph-max-width" />

          <BakeryChart chartData={tezos} />
        </CardWithBackground>

        <div className="grid-two-columns desktop">
          {delegates.map(({ id, ...item }) => (
            <DelegateCard key={id} onClick={handleClickDelegate} {...item} />
          ))}
        </div>

        <div className="mobile">
          <DelegateCard
            onClick={handleClickDelegate}
            handleTabClick={handleTabClick}
            tabItems={tabItems}
            {...delegateMobileData}
          />
        </div>

        <Card className="grid-two-columns grid-column-gap">
          <div>
            <h1>Delegation & Staking&nbsp;101</h1>
            <Description list={bakeryData.delegationAndStaking101} />

            <a href="https://opentezos.com/baking/delegating/" target="_blank" rel="noreferrer">
              Read more about staking here
            </a>
          </div>

          <div className="space-between-vertical">
            <div>
              <h1 className="media-margin-top-1">How to delegate and receive rewards</h1>
              <Description list={bakeryData.howToDelegateAndReceiveRewards} />
            </div>

            <div className="centring-wrapper">
              <ButtonStyled
                text="Delegate to Mavryk Dynamics"
                icon="plusDark"
                kind={ACTION_PRIMARY}
                onClick={() => handleClickDelegate(delegates[1].tzAddress)}
                className="media-margin-top-2"
                disabled={delegates[1].tzAddress === delegates[1].delegateAddress}
              />
            </div>
          </div>
        </Card>

        <FrequentlyAskedQuestions />
      </div>
    </BakeryStyled>
  )
}
