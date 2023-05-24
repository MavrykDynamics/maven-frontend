import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const ToggleButtonWrapper = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.nBackgroundColor};
  border: 1px solid ${({ theme }) => theme.strokeColor};
  border-radius: 20px;
  font-size: 16px;
  max-height: 40px;

  &.swap-toggler {
    margin: 0;
    div {
      padding: 8px 7px;
      font-size: 14px;
    }
  }

  &.action-toggler {
    height: 28px;
    
    div {
      height: 26px;
    }
  }

  @media screen and (max-width: 800px) {
    &.chart-toggler {
      max-height: 30px;
    }
  }

  @media screen and (max-width: 490px) {
    &.chart-toggler {
      max-height: 30px;
    }
  }
`

export const ToggleButtonItem = styled.div<{ theme: MavrykTheme }>`
  padding: 10px 30px;
  height: inherit;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.tabSecondColor};
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 16px;

  &.chart-toggler {
    padding: 10px 25px;
    font-size: 16px;
  }

  &.selected {
    color: ${({ theme }) => theme.cards};
    background: ${({ theme }) => theme.forTabs};
    border-radius: 20px;
  }

  @media screen and (max-width: 425px) {
    padding: 15px 25px;
  }

  @media screen and (max-width: 800px) {
    &.chart-toggler {
      padding: 5px 10px;
      font-size: 14px;
    }
  }

  @media screen and (max-width: 490px) {
    &.chart-toggler {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
`
