import styled from 'styled-components/macro'
import { backgroundTextColor, headerColor, primaryColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'
import { CYAN, BLUE } from './TzAddress.constants'

export const TzAddressContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const TzAddressStyled = styled.div<{ theme: MavrykTheme }>`
  &.primary {
    color: #86d4c9;
  }

  &.secondary {
    color: ${headerColor};
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }

  &.transparent {
    color: ${backgroundTextColor};
  }

  &.bold {
    font-weight: 600;
  }

  &.${CYAN} {
    color: ${({ theme }) => theme.secondaryTextCardColor};
  }

  &.${BLUE} {
    color: ${({ theme }) => theme.walletDetailsAddress};
  }
`

export const TzAddressIcon = styled.svg<{ theme: MavrykTheme }>`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: sub;
  margin-left: 8px;

  &.primary {
    stroke: #86d4c9;
    fill: transparent;
  }

  &.secondary {
    stroke: ${headerColor};
  }

  &.transparent {
    stroke: ${primaryColor};
  }

  &.${CYAN} {
    stroke: ${({ theme }) => theme.linksAndButtons};
    fill: transparent;
  }

  &.${BLUE} {
    stroke: ${({ theme }) => theme.walletDetailsAddress};
    fill: transparent;
  }
`
