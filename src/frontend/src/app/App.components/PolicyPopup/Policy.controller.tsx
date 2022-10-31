import { CSSTransition } from 'react-transition-group'
import { useLockBodyScroll } from 'react-use'
import { PopupContainer, PopupStyled } from '../SettingsPopup/SettingsPopup.style'
import { PolicyPopupContent } from './PolicyPopupContent.controller'

export const PolicyPopup = ({
  isModalOpened,
  proccedPolicy,
}: {
  isModalOpened: boolean
  proccedPolicy: () => void
}) => {
  useLockBodyScroll(isModalOpened)

  return (
    <PopupStyled>
      <CSSTransition in={isModalOpened} timeout={200} classNames="popup" unmountOnExit>
        <PopupContainer style={{ zIndex: 15 }}>
          <PolicyPopupContent proccedPolicy={proccedPolicy} />
        </PopupContainer>
      </CSSTransition>
    </PopupStyled>
  )
}
