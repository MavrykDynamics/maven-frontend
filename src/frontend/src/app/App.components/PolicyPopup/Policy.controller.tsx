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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'none'
    }
  }, [])

  return (
    <PopupStyled>
      <CSSTransition in={isModalOpened || true} timeout={200} classNames="popup" unmountOnExit>
        <PopupContainer style={{ zIndex: 15 }}>
          <PolicyStyled onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="title">Disclaimer: Risks of Using Protocol</div>

            <div className="main_text scroll-block">
              <div className="title">Use at Your Own Risk:</div>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Eu volutpat odio facilisis mauris sit amet massa. Egestas purus viverra accumsan in
                nisl nisi scelerisque eu ultrices. Nisi lacus sed viverra tellus in hac. Arcu bibendum at varius vel
                pharetra vel. Curabitur gravida arcu ac tortor dignissim convallis aenean. Risus nullam eget felis eget
                nunc lobortis. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Sit amet nisl suscipit
                adipiscing. Donec ac odio tempor orci. Non diam phasellus vestibulum lorem sed risus ultricies
                tristique. Vulputate dignissim suspendisse in est ante in nibh mauris. Quis auctor elit sed vulputate mi
                sit amet mauris commodo. Nullam ac tortor vitae purus faucibus ornare suspendisse. Velit egestas dui id
                ornare arcu odio ut. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Est
                sit amet facilisis magna etiam tempor orci eu. Lobortis elementum nibh tellus molestie nunc non blandit
                massa. Nulla porttitor massa id neque aliquam vestibulum morbi. Magna etiam tempor orci eu lobortis
                elementum nibh tellus. Id velit ut tortor pretium viverra suspendisse. Nulla pellentesque dignissim enim
                sit amet venenatis urna. Est lorem ipsum dolor sit amet consectetur. Nunc sed velit dignissim sodales ut
                eu.
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
