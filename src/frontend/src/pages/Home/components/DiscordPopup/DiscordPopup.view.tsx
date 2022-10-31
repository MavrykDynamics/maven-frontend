import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Cookie from 'js-cookie'

// prettier-ignore
import {
    DiscordPopupButton,
    DiscordPopupClose,
    DiscordPopupFigure,
    DiscordPopupGrid,
    DiscordPopupSocials,
    DiscordPopupStyled
} from './DiscordPopup.style'
import { State } from 'utils/interfaces'
import { DARK_THEME, LIGHT_THEME } from 'redux/actions/preferences.action'

type NewsLetterProps = {
  closeCallback?: () => void
}

export const DiscordPopupView = ({ closeCallback }: NewsLetterProps) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const frontImgUrl = themeSelected !== LIGHT_THEME ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
  const frontImgUrlPopup =
    themeSelected !== LIGHT_THEME ? '/images/city-bg-popup-dark.svg' : '/images/city-bg-popup-light.svg'
  const [clicked, setIsClicked] = useState(false)

  React.useEffect(() => {
    if (clicked) {
      console.log('%c ||||| success set IS_SUBSCRIBE', 'color:yellowgreen', clicked)
      Cookie.set('IS_SUBSCRIBE', 'true', { expires: 365, path: '/' })
    }
  }, [clicked])

  return (
    <DiscordPopupStyled>
      {typeof closeCallback !== 'undefined' && (
        <DiscordPopupClose onClick={() => closeCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#close" />
          </svg>
        </DiscordPopupClose>
      )}
      <h2>Join the Mavryk Community</h2>
      <DiscordPopupGrid>
        <h4>Take part in building the future of finance and stay up-to-date with all of our developments</h4>
        <DiscordPopupButton
          href="https://discord.com/invite/7VXPR4gkT6"
          target="_blank"
          rel="noreferrer"
          onClick={() => setIsClicked(true)}
        >
          Join the Mavryk Discord
        </DiscordPopupButton>
        <DiscordPopupSocials>
          <a href="https://twitter.com/Mavryk_Finance" target="_blank" rel="noreferrer">
            <svg>
              <use xlinkHref="/icons/sprites.svg#twitter" />
            </svg>
          </a>
          <a href="https://t.me/Mavryk_Finance" target="_blank" rel="noreferrer">
            <svg>
              <use xlinkHref="/icons/sprites.svg#telegram" />
            </svg>
          </a>
          <a href="https://medium.com/@Mavryk_Finance" target="_blank" rel="noreferrer">
            <svg>
              <use xlinkHref="/icons/sprites.svg#medium" />
            </svg>
          </a>
          <a href="https://github.com/mavrykfinance/" target="_blank" rel="noreferrer">
            <svg>
              <use xlinkHref="/icons/sprites.svg#gitHub" />
            </svg>
          </a>
        </DiscordPopupSocials>
      </DiscordPopupGrid>
      <DiscordPopupFigure>
        <img src={frontImgUrl} alt="Subscribe" />
      </DiscordPopupFigure>
    </DiscordPopupStyled>
  )
}
