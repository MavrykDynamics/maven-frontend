import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const ToggleButtonWrapper = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  border: 1px solid #503eaa;
  background: ${({ theme }) => theme.toggleButtonBg};
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

  @media screen and (max-width: 1200px) and (min-width: 1070px) {
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
  padding: 15px 30px;
  height: inherit;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s all ease-in-out;
  color: ${({ theme }) => theme.toggleButtonColor};
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 16px;

  &.chart-toggler {
    padding: 10px 15px;
    font-size: 16px;
  }

  &.selected {
    color: ${({ theme }) => theme.toggleButtonColorSelected};
    background: ${({ theme }) => theme.toggleButtonBgSelected};
    border-radius: 17.5px;
    transition: 0.4s all ease-in-out;
  }

  @media screen and (max-width: 425px) {
    padding: 15px 25px;
  }

  @media screen and (max-width: 1200px) and (min-width: 1070px) {
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
