import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useLockBodyScroll } from 'react-use'
import { PRIMARY } from '../Button/Button.constants'
import { Button } from '../Button/Button.controller'
import Icon from '../Icon/Icon.view'
import { PopupContainer, PopupStyled } from '../SettingsPopup/SettingsPopup.style'
import { PolicyStyled } from './Policy.style'

export const PolicyPopup = ({
  isModalOpened,
  proccedPolicy,
}: {
  isModalOpened: boolean
  proccedPolicy: () => void
}) => {
  useLockBodyScroll(isModalOpened)
  const [checkbox, setCheckbox] = useState(false)

  return (
    <PopupStyled>
      <CSSTransition in={isModalOpened} timeout={200} classNames="popup" unmountOnExit>
        <PopupContainer style={{ zIndex: 15 }}>
          <PolicyStyled onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="title">Disclaimer: Risks of Using Protocol</div>

            <div className="main_text scroll-block">
              <div className="text">
                <b>TLDR:</b> DeFi is brand new & exciting, but risky. Please interact with common sense, as we are not
                liable for any losses or negligence of any kind. In short, be responsible.
              </div>
              <b>Use at Your Own Risk:</b>
              <div className="text">
                Mavryk Finance is a cutting edge & unique decentralized platform & protocol that allows users to deposit
                assets, trade, lend, and borrow assets. The Mavryk Finance platform & protocol is made up of both
                proprietary and free, public, and open-source software. <br /> <br />
                Your use of Mavryk Finance involves various risks, including, but not limited, to losses while digital
                assets are deposited into Mavryk Finance via smart contract or economic exploits, and losses due to
                liquidations and redemptions.
                <br />
                <br />
                Before lending, borrowing, staking, trading, or liquidity providing you should fully review
                our technical documentation to understand how the Mavryk Finance platform & protocol works. <br />
                <br />
                While Mavryk Finance will be thoroughly audited by an independent software security firm and undergone
                beta testing and public testnet testing, there remains a risk that assets deposited into the protocol as
                well as Mavryk tokens may suffer complete and permanent economic loss should the protocol’s technical or
                economic mechanisms suffer catastrophic failure. <br />
                <br />
                THE MAVRYK FINANCE PLATFORM IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.
                No developer or entity involved in creating the MAVRYK FINANCE PLATFORM & PROTOCOL will be liable for
                any damages or claims whatsoever associated with your use, inability to use, or your interaction with
                other users of Mavryk Finance, including any direct, indirect, incidental, special, exemplary, punitive
                or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
              </div>
            </div>
            <div className="checkbox_wrapper">
              <label className="container">
                <input
                  id="checkbox"
                  type="checkbox"
                  onChange={(e: React.ChangeEvent) => {
                    e.stopPropagation()
                    setCheckbox(!checkbox)
                  }}
                  checked={checkbox}
                />
                <span className="checkmark">
                  <Icon id="checkbox_arrow" />
                </span>
              </label>
              <label htmlFor="checkbox">
                <p>I understand the risks and would like to proceed.</p>
              </label>
            </div>
            <Button
              className="popup_btn LB"
              icon="okIcon"
              kind={PRIMARY}
              onClick={proccedPolicy}
              text="Proceed"
              disabled={!checkbox}
            />
          </PolicyStyled>
        </PopupContainer>
      </CSSTransition>
    </PopupStyled>
  )
}
