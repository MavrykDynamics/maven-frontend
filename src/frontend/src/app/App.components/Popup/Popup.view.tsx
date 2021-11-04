import { NewsletterView } from 'pages/Home/components/Newsletter/Newsletter.view'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { PopupContainer, PopupStyled } from './Popup.style'

export const PopupView = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
      console.log('show')
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PopupStyled>
      <CSSTransition in={show} timeout={300} classNames="popup" unmountOnExit>
        <PopupContainer>
          <NewsletterView closeCallback={() => setShow(false)} />
        </PopupContainer>
      </CSSTransition>
    </PopupStyled>
  )
}
