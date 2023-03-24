import styled, { css } from 'styled-components/macro'
import { cyanColor } from 'styles'
import { BUTTON_RADIUS } from 'styles/constants'
import { MavrykTheme } from 'utils/interfaces'

// Common style parts START
const VISIBLE_PART_CONNECTED_WALLET = (theme: MavrykTheme, isMobileDetails?: boolean) => `
.top-visible-part {
  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;

  var {
    font-weight: 400;
    font-size: 14px;
    color: ${theme.linksAndButtons};
    transition: 0.6s all;
    display: flex;
    column-gap: 10px;

    div {
      font-style: normal;
    }
  }

  .end-icon {
    height: 15px;
    width: 10px;
    transform: rotate(-90deg);
    margin-left: 3px;
    transition: 0.6s all;
    stroke: ${theme.linksAndButtons};
  }

  .openLink {
    height: 15px;
    width: 20px;
  }

  .wallet {
    width: 22px;
    height: 20px;
    stroke: ${theme.linksAndButtons};
    fill: transparent;
    transition: 0.6s all;
  }

  @media screen and (max-width: 870px) {
    var {
      font-size: 20px;
    }

    .openLink {
      height: 20px;
      width: 20px;
    }
  
    .wallet {
      width: 25px;
      height: 20px;
    }
  }
}
`

const BUTTONS_WRAPPER_CONNECTED_WALLET = `
.buttons-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
`
// Common style parts END

export const ConnectWalletStyled = styled.div<{ theme: MavrykTheme }>`
  text-align: center;
  border-radius: ${BUTTON_RADIUS};
  margin: 10px auto 34px;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  column-gap: 20px;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }

  &.LB {
    > button {
      width: 400px;
    }
  }
`

export const ConnectedWalletStyled = styled.div<{ theme: MavrykTheme }>`
  height: 100%;
  display: flex;
  align-items: center;

  ${({ theme }) =>
    css`
      ${VISIBLE_PART_CONNECTED_WALLET(theme)}
    `}

  .top-visible-part {
    &.mobile {
      .end-icon {
        transform: rotate(-180deg);
        padding-right: 10px;
        width: 15px;
        height: 18px;
      }
      width: 236px;
      justify-content: space-between;
      padding-left: 10px;
      var {
        column-gap: 5px;
      }
    }
  }

  &:hover {
    var,
    .wallet,
    .end-icon {
      opacity: 0.8;
    }
    .end-icon {
      transform: rotate(90deg);
    }
  }

  .wallet-details {
    position: absolute;
    visibility: hidden;
    padding: 30px;
    top: 85px;
    opacity: 0;
    right: 15px;
    transition: 0.6s all;
    width: 375px;
    background: ${({ theme }) => theme.darkBackroundColor};
    border: 1px solid ${({ theme }) => theme.selectedColor};
    border-radius: 10px;

    &.visible {
      opacity: 1;
      visibility: visible;
    }

    &.mobile {
      display: none;
    }

    .buttons-wrapper {
      column-gap: 10px;
      align-items: center;
    }

    .wallet-details-header {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding-bottom: 30px;

      &:before {
        content: '';
        position: absolute;
        bottom: 15px;
        width: 375px;
        left: 50%;
        transform: translateX(-50%);
        height: 1px;
        background: #503eaa;
      }

      .details-wallet {
        display: flex;
        column-gap: 10px;
        font-weight: 600;
        font-size: 22px;
        line-height: 22px;
        color: ${({ theme: { walletDetailsAddress } }) => walletDetailsAddress};

        &:hover {
          div {
            color: ${({ theme }) => theme.linksAndButtons};
          }

          svg {
            stroke: ${({ theme }) => theme.linksAndButtons};
          }
        }

        var {
          font-style: normal;
        }

        svg {
          &.wallet {
            width: 27px;
            height: 22px;
          }
          stroke: ${({ theme: { walletDetailsAddress } }) => walletDetailsAddress};
          fill: transparent;
        }
      }

      a {
        svg {
          width: 16px;
          height: 16px;
          stroke: ${({ theme }) => theme.policyPopupTextColor};
          fill: transparent;
        }

        &:hover {
          svg {
            stroke: ${({ theme }) => theme.selectedColor};
          }
        }
      }
    }
  }

  ${BUTTONS_WRAPPER_CONNECTED_WALLET}
`

export const MobileDetailsStyled = styled.div<{ theme: MavrykTheme }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  background: ${({ theme }) => theme.darkBackroundColor};
  padding-top: 60px;

  .close {
    position: absolute;
    top: 27px;
    right: 15px;
    cursor: pointer;
    z-index: 20;

    svg {
      width: 26px;
      height: 21px;
      stroke: #8d86eb;
      transition: 0.6s all;
    }

    &:hover {
      svg {
        stroke: ${cyanColor};
      }
    }
  }

  .wallet-details-header {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-bottom: 20px;
    width: 88%;
    max-width: 500px;
    margin: 0px auto 5px auto;

    &:before {
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100vw;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      background: #503eaa;
    }

    .details-wallet {
      display: flex;
      column-gap: 10px;
      font-weight: 600;
      font-size: 22px;
      line-height: 22px;
      color: ${({ theme: { walletDetailsAddress } }) => walletDetailsAddress};

      var {
        font-style: normal;
      }

      svg {
        &.wallet {
          width: 27px;
          height: 22px;
        }
        stroke: ${({ theme: { walletDetailsAddress } }) => walletDetailsAddress};
        fill: transparent;
      }
    }

    a {
      margin-right: 35px;
      svg {
        width: 16px;
        height: 16px;
        stroke: ${({ theme }) => theme.policyPopupTextColor};
        fill: transparent;
      }

      &:hover {
        svg {
          stroke: ${({ theme }) => theme.selectedColor};
        }
      }
    }
  }

  .details {
    margin: 0 auto;
    width: 88%;
    max-width: 500px;

    ${BUTTONS_WRAPPER_CONNECTED_WALLET}

    .buttons-wrapper {
      column-gap: 10px;
    }
  }

  @media screen and (max-width: 450px) {
    padding-top: 30px;

    .details {
      margin: 0 auto;
      width: 88%;
    }
  }
`

export const ConnectedWalletDetailsItemStyled = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  position: relative;

  .left-part {
    display: flex;
    flex-direction: column;

    .main-wrap {
      display: flex;
      align-items: center;
      column-gap: 10px;

      .icon {
        width: 24px;
        height: 24px;

        img,
        svg {
          width: 100%;
          height: 100%;
        }
      }

      .main {
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        color: ${({ theme }) => theme.policyPopupTextColor};

        @media screen and (max-width: 550px) {
          font-size: 16px;
          line-height: 17px;
        }
      }
    }

    > div {
      &.subtext {
        font-weight: 500;
        padding-left: 34px;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme: { walletDetailsSubtext } }) => walletDetailsSubtext};

        @media screen and (max-width: 550px) {
          font-size: 12px;
          line-height: 17px;
        }
      }

      p {
        margin: 0;
        white-space: nowrap;
        width: fit-content;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    align-items: center;
    svg {
      width: 6px;
      height: 13px;
      transform: rotate(180deg);
      stroke: ${({ theme }) => theme.linksAndButtons};
    }
  }

  &:not(:nth-last-child(2)):before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #503eaa;
  }
`

export const WalletConnectedButton = styled.div<{ theme: MavrykTheme }>`
  font-weight: 600;
  margin: 10px auto;
  display: flex;
  column-gap: 10px;
  align-items: center;
  margin-top: -6px;
  margin-bottom: -6px;

  var {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    font-style: normal;
    color: ${({ theme }) => theme.headerSkyColor};
    margin-bottom: 5px;

    > div {
      svg {
        stroke: ${({ theme }) => theme.headerSkyColor};
        width: 18px;
        height: 18px;
        margin-left: 6px;
      }
    }
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: ${({ theme }) => theme.stakedColor};
    margin-top: 4px;
    margin-bottom: 0;
  }

  button {
    svg {
      width: 24px;
      height: 18px;
      fill: ${({ theme }) => theme.headerColor};
    }
  }
`

export const WalletNotConnectedButton = styled.button<{ theme: MavrykTheme }>`
  margin: 0 auto;
  height: 50px;
  cursor: pointer;
  border-radius: ${BUTTON_RADIUS};
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  color: ${({ theme }) => theme.cards};
  background-color: ${({ theme }) => theme.linksAndButtons};
  white-space: nowrap;

  svg {
    stroke: ${({ theme }) => theme.cards};
    width: 25px;
    height: 30px;
    fill: transparent;
    margin-right: 16px;
  }

  &.connect-wallet-small {
    width: 220px;
  }

  &.connect-wallet-large {
    width: 400px;
  }

  &:hover {
    opacity: 0.8;
  }

  span {
    padding-right: 16px;
  }
`

export const SignOutButton = styled(WalletNotConnectedButton)`
  width: 110px;
  margin: 0;
  color: ${({ theme }) => theme.containerColor};
  font-size: 14px;
`

export const SimpleConnectedButton = styled.div<{ theme: MavrykTheme }>`
  margin: 0 auto;
  height: 50px;
  cursor: pointer;
  color: ${({ theme }) => theme.connectWalletSecondary};
  border: 2px solid ${({ theme }) => theme.connectWalletSecondary};
  border-radius: ${BUTTON_RADIUS};
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  font-size: 12px;

  > svg {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 14px 9px 13px 8px;
    stroke: ${({ theme }) => theme.connectWalletSecondary};
    vertical-align: top;
  }

  > div {
    display: inline-block;
    margin-right: 9px;
    font-weight: 600;
    color: ${({ theme }) => theme.connectWalletSecondary};
  }
`

export const ConnectWalletInfoStyled = styled.blockquote<{ theme: MavrykTheme }>`
  border-radius: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: ${({ theme }) => theme.connectInfoColor};
  margin-top: 32px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin-right: 155px;
    color: ${({ theme }) => theme.headerColor};
    margin-top: 2px;
    margin-bottom: 2px;

    & + div {
      margin: 0;
    }
  }
`

export const ConnectWalletClose = styled.button<{ theme: MavrykTheme }>`
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 32px;
  cursor: pointer;

  .close-connect-wallet {
    stroke: ${({ theme }) => theme.headerColor};
    width: 14px;
    height: 14px;
  }
`

export const WertIo = styled.div`
  width: 100%;
  background: #160e3f;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #86d4c9;
  height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 550px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0px;
    border-radius: 0;
    border: none;
  }
`
