import { ROCKET_LOADER, WERT_IO_LOADER } from 'utils/consts'
import { LoaderShineTextAnimation, LoaderStyled, LoaderStyledWithBackdrop } from './Loader.style'
import { State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import { useLockBodyScroll } from 'react-use'

export const LoaderRocket = () => {
  return (
    <LoaderStyledWithBackdrop>
      <figure>
        <div>
          <img src="icons/lottie_rocket.gif" />
        </div>
      </figure>
    </LoaderStyledWithBackdrop>
  )
}

export const LoaderWertIo = () => (
  <LoaderStyledWithBackdrop backdropAlpha={0.8}>
    <LoaderShineTextAnimation>Initializating Wert Io widget...</LoaderShineTextAnimation>
  </LoaderStyledWithBackdrop>
)

export const SpinnerLoader = () => (
  <LoaderStyled>
    <div className="loading">
      <div className="loading__square"></div>
      <div className="loading__square"></div>
      <div className="loading__square"></div>
      <div className="loading__square"></div>
      <div className="loading__square"></div>
      <div className="loading__square"></div>
      <div className="loading__square"></div>
    </div>
  </LoaderStyled>
)

export const Loader = () => {
  const { loading: loaderType } = useSelector((state: State) => state)
  useLockBodyScroll(!!loaderType)
  switch (loaderType) {
    case null:
      return null
    case ROCKET_LOADER:
      return <LoaderRocket />
    case WERT_IO_LOADER:
      return <LoaderWertIo />
    default:
      return <SpinnerLoader />
  }
}

export default Loader
