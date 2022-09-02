import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'
import Icon from './Icon.view'

export const FarmCardTokenLogoContainer = styled.figure<{ theme: MavrykTheme }>`
  height: 50px;
  align-items: center;
  position: relative;
  margin: 0;
  width: 50px;
  > img {
    align-items: center;
    justify-content: center;
    position: absolute;
  }
`
export const FarmCardFirstTokenIcon = styled.img<{ theme: MavrykTheme }>`
  height: 43px;
  width: 43px;
  bottom: 5px;
  right: -5px;
  align-self: flex-end;
  z-index: 1;
`
export const FarmCardSecondTokenIcon = styled.img<{ theme: MavrykTheme }>`
  height: 30px;
  width: 30px;
  top: -8px;
  left: 0;
  align-self: flex-end;
`

export default function CoinsIcons() {
  return (
    <FarmCardTokenLogoContainer>
      <FarmCardFirstTokenIcon src={'/images/coin-gold.svg'} />
      <FarmCardSecondTokenIcon src={'/images/coin-silver.svg'} />
    </FarmCardTokenLogoContainer>
  )
}

// General Assets logo component
export const CoinsLogo = ({ assetName, className }: { assetName: string; className?: string }) => {
  return assetName.toLowerCase() === 'mvk' ? (
    <Icon id="mvkTokenGold" className={className} />
  ) : (
    <img
      className={className}
      src={`//logo.chainbit.xyz/${assetName.toLowerCase()}`}
      alt={`${assetName.toLowerCase()} logo`}
      loading="lazy"
    />
  )
}
