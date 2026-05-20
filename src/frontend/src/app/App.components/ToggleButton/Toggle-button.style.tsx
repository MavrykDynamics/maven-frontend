import styled from 'styled-components'
import { MavenTheme } from 'utils/interfaces'

export const ToggleButtonWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 1px;
  width: fit-content;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.nBackgroundColor};
  border: 1px solid ${({ theme }) => theme.strokeColor};
  border-radius: 20px;
  font-size: 16px;
  max-height: 40px;

  &.swap-toggler {
    div {
      font-size: 14px;
    }
  }

  &.action-toggler {
    height: 30px;

    div {
      height: 26px;
    }
  }

  @media screen and (max-width: 800px) {
    &.chart-toggler {
      max-height: 30px;
    }
  }
`

export const ToggleButtonItem = styled.div`
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

export const ThemeToggleButton = styled.button<{ checked: boolean; theme: MavenTheme }>`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .theme-toggle-track {
    position: relative;
    display: block;
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: ${({ checked, theme }) => (checked ? theme.darkestBackroundColor : theme.linksAndButtons)};
    transition: background-color 0.2s ease;
  }

  .theme-toggle-icon {
    position: absolute;
    top: 3px;
    width: 18px;
    height: 18px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .theme-toggle-icon.checked {
    left: 6px;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
  }

  .theme-toggle-icon.unchecked {
    right: 6px;
    opacity: ${({ checked }) => (checked ? 0 : 1)};
  }

  .theme-toggle-thumb {
    position: absolute;
    top: 1px;
    left: ${({ checked }) => (checked ? '27px' : '1px')};
    width: 22px;
    height: 22px;
    border: 1px solid #fafafa;
    border-radius: 50%;
    background-color: #fafafa;
    transition: left 0.25s ease;
  }
`
