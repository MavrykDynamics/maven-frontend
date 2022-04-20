import * as React from 'react'
import { useState } from 'react'
import { useMailChimpForm } from 'use-mailchimp-form'
import { useSelector } from 'react-redux'

// prettier-ignore
import {
  NewsletterFigure,
  NewsletterButton,
  NewsletterClose,
  NewsletterForm,
  NewsletterGrid,
  NewsletterStatus,
  NewsletterStyled,
} from './Newsletter.style'
import animationData from './ship-loop.json'

type NewsLetterProps = {
  closeCallback?: () => void
}

export const NewsletterView = ({ closeCallback }: NewsLetterProps) => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const frontImgUrl = darkThemeEnabled ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
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
            placeholder="Organisation"
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
          <NewsletterButton onClick={() => subscribe()}>Subscribe</NewsletterButton>
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
