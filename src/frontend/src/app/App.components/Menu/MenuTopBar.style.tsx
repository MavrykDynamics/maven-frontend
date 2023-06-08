import styled, { css } from 'styled-components/macro'
import { MENU_Z_INDEX, Z_INDEX_DEFAULT } from 'styles/constants'
import { MavrykTheme } from 'utils/interfaces'

export const MenuTopStyled = styled.div<{ theme: MavrykTheme }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  height: 80px;
  z-index: 11;
  background: ${({ theme }) => theme.darkBackroundColor};
  display: flex;
  align-items: center;
  padding: 0 22px 0 34px;

  #connectWalletButton {
    margin: 0;
  }

  .left-side,
  .right-side {
    display: flex;
    align-items: center;
  }

  .right-side {
    height: 100%;
    .settingsIcon {
      margin-left: 25px;
      cursor: pointer;
      transition: 0.35s all;

      @media screen and (max-width: 1000px) {
        margin-left: 15px;
      }

      svg {
        width: 28px;
        height: 28px;
        transition: 0.35s all;
        fill: ${({ theme }) => theme.linksAndButtons};
      }

      &:hover {
        opacity: 0.8;
      }
    }

    .social-wrapper {
      display: flex;
      column-gap: 8px;
      margin-right: 20px;

      @media screen and (max-width: 1110px) {
        display: none;
      }

      svg {
        fill: ${({ theme }) => theme.menuButtonText};
        width: 30px;
        height: 30px;
      }
    }
  }

  .grouped-links {
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .mobile-menu {
    display: none;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    > div {
      margin: 0;
    }

    .top-bar-toggler {
      cursor: pointer;
      svg {
        width: 30px;
        height: 30px;
        stroke: ${({ theme }) => theme.toggleButtonColor};
        transition: 0.6s all;
      }

      &:hover {
        svg {
          stroke: ${({ theme }) => theme.selectedColor};
        }
      }
    }

    .settingsIcon {
      cursor: pointer;
      svg {
        width: 28px;
        height: 28px;
        transition: 0.35s all;
        fill: ${({ theme }) => theme.linksAndButtons};
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media screen and (max-width: 870px) {
    .mobile-menu {
      display: flex;
    }

    .grouped-links,
    .left-side,
    .right-side {
      display: none;
    }
  }
`

export const MenuMobileBurger = styled.div<{ theme: MavrykTheme }>`
  display: block;
  width: fit-content;
  margin: 0 auto;
  transition: all 1s cubic-bezier(0.42, 0, 0.58, 1);
  align-items: center;
  cursor: pointer;
  margin-right: 24px;

  &.expanded {
    transform: rotate(-540deg);
  }

  svg {
    width: 30px;
    height: 30px;
    transition: 0.6s all;
  }

  @media screen and (min-width: 1401px) {
    display: none;
  }
`

export const MobileTopBarStyled = styled.div<{ show: boolean; theme: MavrykTheme }>`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 80px);
  max-height: 0;
  left: 0;
  top: 80px;
  background: ${({ theme }) => theme.cards};
  z-index: ${MENU_Z_INDEX};
  transition: 0.5s all;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  #connectWalletButton {
    height: fit-content;
    margin: 20px auto 30px auto;
    width: fit-content;
  }

  .container {
    max-width: 236px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 25px;

    .social-wrapper {
      display: flex;
      column-gap: 10px;
      justify-content: center;
      margin-top: auto;

      svg {
        fill: ${({ theme }) => theme.menuButtonText};
        width: 35px;
        height: 35px;
      }
    }
  }

  @media screen and (min-width: 870px) {
    display: none;
  }

  ${({ show }) =>
    show
      ? css`
          max-height: calc(100vh - 80px);
        `
      : 'padding: 0;'}
`
export const MenuLogo = styled.img`
  z-index: ${Z_INDEX_DEFAULT};
  width: 218px;
  height: 43px;

  &.mobile-logo {
    display: none;
  }

  @media screen and (max-width: 1400px) {
    width: 160px;
  }

  @media screen and (max-width: 950px) {
    &.desktop-logo {
      display: none;
    }

    &.mobile-logo {
      display: block;
      width: fit-content;
    }
  }
`
