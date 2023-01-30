// compopnents
import Icon from "app/App.components/Icon/Icon.view"
import { Description } from "./Description.view"
import { SlidingTabButtons, TabItem } from "app/App.components/SlidingTabButtons/SlidingTabButtons.controller"
import { CommaNumber } from "app/App.components/CommaNumber/CommaNumber.controller"

// styles
import { Card, MiniCard, RoundButton, ButtonStyled } from "../Bakery.style"

// helpers
import { TzAddress } from "app/App.components/TzAddress/TzAddress.view"
import { ButtonStyle } from "app/App.components/Button/Button.constants"
import { CYAN } from 'app/App.components/TzAddress/TzAddress.constants'

type Props = {
  title: string
  tzAddress: string
  delegateAddress: string
  rewards: number[]
  commission: number[]
  availableXtzSpace: number[]
  description: string[]
  buttonName: string
  kind: string
  link: string
  onClick: (address: string) => void
  handleTabClick?: (id: number) => void
  tabItems?: TabItem[]
}

export function DelegateCard ({
  title,
  tzAddress,
  delegateAddress,
  rewards,
  commission,
  availableXtzSpace,
  onClick,
  description,
  buttonName,
  kind,
  link,
  tabItems,
  handleTabClick,
}: Props) {
  const showSlider = tabItems?.length && handleTabClick

  return (
    <Card className='space-between-vertical'>
      <div>
        {showSlider
          ? <SlidingTabButtons 
            className="slider"
            tabItems={tabItems}
            onClick={handleTabClick}
          />
          : <div className='space-between-horizontal'>
            <h1>{title}</h1>

            <RoundButton
              className={kind}
              disabled={tzAddress === delegateAddress}
              onClick={() => onClick(tzAddress)}
            >
              <Icon id='plusDark' />
            </RoundButton>
          </div>}

        <Description list={description} />
      </div>

      <div>
        <div className='address'>
          <span>Bakery Address</span>
            &nbsp;
            <TzAddress type={CYAN} tzAddress={tzAddress} hasIcon />
        </div>

        <div className='grid-three-columns'>
          <MiniCard>
            <Icon id='threeCoins' />
            <h4>Rewards</h4>
            <span>{rewards[0]}-{rewards[1]}%</span>
          </MiniCard>

          <MiniCard>
            <Icon id='coinHand' />
            <h4>Commission</h4>
            <span>{commission[0]}%</span>
          </MiniCard>
          
          <MiniCard>
            <Icon id='planet' />
            <h4>Available XTZ Space</h4>
            {availableXtzSpace[0] === -1
              ? <span>no data</span>
              : <CommaNumber value={availableXtzSpace[0]} className='commaNumber' />}
          </MiniCard>
        </div>

        <div className='centring-wrapper'>
          <ButtonStyled
            text={buttonName}
            icon='plusDark'
            kind={kind as ButtonStyle}
            onClick={() => onClick(tzAddress)}
            disabled={tzAddress === delegateAddress}
          />
        </div>
      </div>
    </Card>
  ) 
}
