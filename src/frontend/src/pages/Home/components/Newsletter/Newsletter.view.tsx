import * as React from 'react'
import { useState } from 'react'
import Lottie from 'react-lottie'
import { useMailChimpForm } from 'use-mailchimp-form'

// prettier-ignore
import { NewsletterAnimation, NewsletterButton, NewsletterClose, NewsletterForm, NewsletterGrid, NewsletterStatus, NewsletterStyled } from './Newsletter.style'
import animationData from './ship-loop.json'

type NewsLetterProps = {
  closeCallback?: () => void
}

export const NewsletterView = ({ closeCallback }: NewsLetterProps) => {
  const url = 'https://Finance.us5.list-manage.com/subscribe/post?u=2c7f8eeb6244c13270dca7a76&amp;id=da98ceea07'
  const { loading, error, success, message, handleSubmit } = useMailChimpForm(url)
  //@ts-ignore
  const [values, setValues] = useState({
    EMAIL: '',
    NAME: '',
    ORGANISATI: '',
  })

  const subscribe = () => {}

  var shipLoopOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <NewsletterStyled id="newsletter">
      <h1>Subscribe to Mavryk News</h1>
      {typeof closeCallback !== 'undefined' && (
        <NewsletterClose onClick={() => closeCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#close" />
          </svg>
        </NewsletterClose>
      )}
      <NewsletterGrid>
        <NewsletterAnimation>
          <Lottie
            options={shipLoopOptions}
            isClickToPauseDisabled={true}
          />
        </NewsletterAnimation>
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
        </NewsletterForm>
      </NewsletterGrid>
      <NewsletterStatus>
        {loading && <div className="loading">{`Submitting...`}</div>}
        {error && <div className="error">{message}</div>}
        {success && <div className="success">{message}</div>}
      </NewsletterStatus>
    </NewsletterStyled>
  )
}
