import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMailChimpForm } from 'use-mailchimp-form'

// prettier-ignore
import { NewsletterButton, NewsletterClose, NewsletterFigure, NewsletterForm, NewsletterGrid, NewsletterStatus, NewsletterStyled } from './Newsletter.style'
import animationData from './ship-loop.json'

type NewsLetterProps = {
  closeCallback?: () => void
}

export const NewsletterView = ({ closeCallback }: NewsLetterProps) => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const frontImgUrl = darkThemeEnabled ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
  const frontImgUrlPopup = darkThemeEnabled ? '/images/city-bg-popup-dark.svg' : '/images/city-bg-popup-light.svg'
  const url = 'https://Finance.us5.list-manage.com/subscribe/post?u=2c7f8eeb6244c13270dca7a76&amp;id=da98ceea07'
  const { loading, error, success, message, handleSubmit } = useMailChimpForm(url)
  //@ts-ignore
  const [values, setValues] = useState({
    EMAIL: '',
    NAME: '',
    ORGANISATI: '',
  })

  const subscribe = () => {}

  const animation = JSON.parse(JSON.stringify(animationData))

  var shipLoopOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <NewsletterStyled id="newsletter">
      {typeof closeCallback !== 'undefined' && (
        <NewsletterClose onClick={() => closeCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#close" />
          </svg>
        </NewsletterClose>
      )}
      <h2>Subscribe to Mavryk News</h2>
      <NewsletterGrid>
        <NewsletterForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(values)
          }}
        >
          <input
            id="name"
            required
            placeholder="Name"
            type="text"
            value={values.NAME}
            onChange={(e: any) =>
              setValues({
                ...values,
                NAME: e.target.value,
              })
            }
          />
          <input
            id="company"
            required
            placeholder="Organization"
            type="text"
            value={values.ORGANISATI}
            onChange={(e: any) =>
              setValues({
                ...values,
                ORGANISATI: e.target.value,
              })
            }
          />
          <input
            id="username"
            required
            placeholder="Email*"
            type="email"
            value={values.EMAIL}
            onChange={(e: any) =>
              setValues({
                ...values,
                EMAIL: e.target.value,
              })
            }
          />
          <NewsletterButton>Subscribe</NewsletterButton>
          <NewsletterStatus>
            {loading && <div className="loading">{`Submitting...`}</div>}
            {error && <div className="error">{message}</div>}
            {success && <div className="success">{message}</div>}
          </NewsletterStatus>
        </NewsletterForm>
      </NewsletterGrid>
      <NewsletterFigure>
        <img src={frontImgUrl} alt="Subscribe" />
      </NewsletterFigure>
    </NewsletterStyled>
  )
}
