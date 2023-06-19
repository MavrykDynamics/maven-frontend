import { CSSTransition } from 'react-transition-group'
import { useLockBodyScroll } from 'react-use'
import { PolicyPopupContent } from './PolicyPopupContent.controller'
import { PopupStyled } from '../Popup/Popup.style'
import { PopupContainer } from '../Popup/PopupMain.style'

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
        <PopupContainer show={isModalOpened} style={{ zIndex: 15 }}>
          <PolicyPopupContent proccedPolicy={proccedPolicy} />
        </PopupContainer>
      </CSSTransition>
    </PopupStyled>
  )
}
