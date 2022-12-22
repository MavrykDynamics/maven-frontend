// compopnents
import Icon from "app/App.components/Icon/Icon.view"

// styles
import { Card, MiniCard, RoundButton, ButtonStyled } from "../Bakery.style"

// helpers
import { CYAN } from "app/App.components/TzAddress/TzAddress.constants"
import { TzAddress } from "app/App.components/TzAddress/TzAddress.view"
import { ButtonStyle } from "app/App.components/Button/Button.constants"

type Props = {
  title: string
  tzAddress: string
  rewards: number[]
  commission: number[]
  availableXtzSpace: number[]
  onClick: () => void
  description: string[]
  kind: string
  link: string
}

export function DelegateCard ({
  title,
  tzAddress,
  rewards,
  commission,
  availableXtzSpace,
  onClick,
  description,
  kind,
  link,
}: Props) {
  return (
    <Card className='space-between-vertical'>
      <div>
        <div className='space-between-horizontal'>
          <h1>{title}</h1>

          <RoundButton
            className={kind}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            <Icon id='plusDark' />
          </RoundButton>
        </div>

        {description.map((text) => (
          <p>{text}</p>
        ))}

        <div className='address'>
          <span>Bakery Address</span>
          &nbsp;
          <TzAddress type={CYAN} tzAddress={tzAddress} hasIcon />
        </div>

        <div className='grid-three-columns'>
          <MiniCard>
            <Icon id='threeCoins' />
            <h4>Rewards</h4>
            <span>{rewards[0]-rewards[1]}%</span>
          </MiniCard>

          <MiniCard>
            <Icon id='coinHand' />
            <h4>Commission</h4>
            <span>{commission[0]}%</span>
          </MiniCard>
          
          <MiniCard>
            <Icon id='planet' />
            <h4>Available XTZ Space</h4>
            <span>~ {availableXtzSpace[0]} days</span>
          </MiniCard>
        </div>
      </div>

      <div className='centring-wrapper'>
        <ButtonStyled
          text='Delegate to the DAO'
          icon='plusDark'
          kind={kind as ButtonStyle}
          onClick={onClick}
        />
      </div>
    </Card>
  ) 
}
