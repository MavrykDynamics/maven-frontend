import { NewsletterView } from 'pages/Home/components/Newsletter/Newsletter.view'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Cookie from 'js-cookie'

import { PopupContainer, PopupStyled, PopupNewsletter } from './Popup.style'

export const PopupView = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isCloseCookie = Cookie.get('CLOSE_POPUP') === 'true'
    const isSubscribeCookie = Cookie.get('IS_SUBSCRIBE') === 'true'

    const delay = isCloseCookie ? 60000 : 4500
    const timer = setTimeout(() => {
      if (!isSubscribeCookie) {
        setShow(true)
      }
      Cookie.remove('CLOSE_POPUP')
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  const handleClosePopup = () => {
    setShow(false)
    // 1 minute
    Cookie.set('CLOSE_POPUP', 'true', { expires: 1, path: '/' })
  }

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    // close modal when click on close button or modal backdrop
    // if (e.target === e.currentTarget) {
    //   handleClosePopup()
    // }
  }

  const handleEsc = (event: React.KeyboardEvent<object>): void => {
    // close modal press key Esc
    const keyCode: number = event.keyCode
    if (keyCode === 27) {
      handleClosePopup()
    }
  }

  useEffect(() => {
    if (show) {
      // @ts-ignore
      document.addEventListener('keydown', handleEsc)
    }
  })

  return (
    <PopupStyled>
      <CSSTransition in={show} timeout={300} classNames="popup" unmountOnExit>
        <PopupContainer onClick={handleCloseModal}>
          <PopupNewsletter>
            <NewsletterView closeCallback={handleClosePopup} />
          </PopupNewsletter>
        </PopupContainer>
      </CSSTransition>
    </PopupStyled>
  )
}
