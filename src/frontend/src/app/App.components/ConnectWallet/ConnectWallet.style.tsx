import styled from 'styled-components/macro'

import { connectWalletSecondary, cyanColor, headerColor, skyColor } from 'styles'
import { BUTTON_RADIUS } from 'styles/constants'

export const ConnectWalletStyled = styled.div`
  text-align: center;
  border-radius: ${BUTTON_RADIUS};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 80%;
  max-width: 260px;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`

export const WalletConnectedButton = styled.div`
  font-weight: 600;
  align-items: center;
  display: flex;
  flex-direction: row;

  var {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    font-style: normal;
    color: ${skyColor};
    > div {
      svg {
        stroke: ${skyColor};
        width: 18px;
        height: 18px;
        margin-left: 6px;
      }
    }
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: ${cyanColor};
    margin-top: 4px;
    margin-bottom: 0;
    overflow-wrap: break-word;
    max-width: 150px;
  }

  button {
    background: transparent;
    border: none;
    margin: 0 7px;
    svg {
      width: 24px;
      height: 18px;
      fill: ${headerColor};
      transform: rotate(90deg);
    }
  }
`
export const WalletNotConnectedButton = styled.button`
  margin: 0 auto;
  height: 50px;
  cursor: pointer;
  color: ${skyColor};
  border: 2px solid ${skyColor};
  border-radius: ${BUTTON_RADIUS};
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  background: none;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 25px;
    height: 30px;
    stroke: ${skyColor};
    fill: transparent;
    margin-right: 16px;
  }

  span {
    padding-right: 16px;
  }

  @media (max-width: 1440px) {
    height: 40px;
    width: 200px;
    font-size: 11px;

    svg {
      width: 20px;
      height: 25px;
    }
  }

  @media (max-width: 1024px) {
    height: 50px;
    width: 250px;
    font-size: 12px;

    svg {
      width: 25px;
      height: 30px;
    }
  }
`

export const SimpleConnectedButton = styled.div`
  margin: 0 auto;
  height: 50px;
  cursor: pointer;
  color: ${connectWalletSecondary};
  border: 2px solid ${connectWalletSecondary};
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
    stroke: ${connectWalletSecondary};
    vertical-align: top;
  }

  > div {
    display: inline-block;
    margin-right: 9px;
    font-weight: 600;
    color: ${connectWalletSecondary};
  }
`
