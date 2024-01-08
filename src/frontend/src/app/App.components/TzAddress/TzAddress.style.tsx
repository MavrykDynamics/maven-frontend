import styled from 'styled-components/macro'
import {backgroundTextColor, headerColor, primaryColor} from 'styles'
import {MavenTheme} from 'utils/interfaces'
import {BLUE, CYAN} from './TzAddress.constants'

export const TzAddressContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const TzAddressStyled = styled.div<{ theme: MavenTheme }>`
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
    color: ${({ theme }) => theme.linksAndButtons};
  }

  &.${BLUE} {
    color: ${({ theme }) => theme.walletDetailsAddress};
  }
`

export const TzAddressIcon = styled.svg<{ theme: MavenTheme }>`
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
    fill: ${({ theme }) => theme.linksAndButtons};
  }

  &.${BLUE} {
    fill: ${({ theme }) => theme.walletDetailsAddress};
  }
`
