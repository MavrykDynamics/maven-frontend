import * as React from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useMailChimpForm} from 'use-mailchimp-form'
import Cookie from 'js-cookie'

// prettier-ignore
import {
    NewsletterButton,
    NewsletterClose,
    NewsletterFigure,
    NewsletterForm,
    NewsletterGrid,
    NewsletterStatus,
    NewsletterStyled
} from './Newsletter.style'
import animationData from './ship-loop.json'
import {State} from 'utils/interfaces'
import {LIGHT_THEME} from 'redux/actions/preferences.action'

type NewsLetterProps = {
  closeCallback?: () => void
}

export const NewsletterView = ({ closeCallback }: NewsLetterProps) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const frontImgUrl = themeSelected !== LIGHT_THEME ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
  const frontImgUrlPopup =
    themeSelected !== LIGHT_THEME ? '/images/city-bg-popup-dark.svg' : '/images/city-bg-popup-light.svg'
  const url = 'https://mavryk.us9.list-manage.com/subscribe/post?u=05fca2aef18a53f210baf1ad7&amp;id=46683ae062&amp;f_id=00d626e1f0'
  const { loading, error, success, message, handleSubmit } = useMailChimpForm(url)
  //@ts-ignore
  const [values, setValues] = useState({
    EMAIL: '',
    NAME: '',
    COMPANY: '',
  })

  const subscribe = () => {}

  React.useEffect(() => {
    if (success) {
      Cookie.set('IS_SUBSCRIBE', 'true', { expires: 365, path: '/' })
    }
  }, [success])

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
    <NewsletterStyled>
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
            value={values.COMPANY}
            onChange={(e: any) =>
              setValues({
                ...values,
                  COMPANY: e.target.value,
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
