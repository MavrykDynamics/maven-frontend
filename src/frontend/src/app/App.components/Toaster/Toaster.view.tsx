import {
  ToasterContent,
  ToasterCountdown,
  ToasterGrid,
  ToasterIcon,
  ToasterMessage,
  ToasterStyled,
  ToasterTitle,
} from './Toaster.style'

type ToasterViewProps = {
  showing: boolean
  status?: string
  title?: string
  message?: string
}

export const ToasterView = ({ showing, status, title = 'Error', message = 'Undefined Error' }: ToasterViewProps) => {
  return (
    <ToasterStyled showing={showing}>
      <ToasterGrid>
        <ToasterIcon status={status}>
          <svg>
            <use xlinkHref={`/icons/sprites.svg#${status}`} />
          </svg>
        </ToasterIcon>
        <ToasterContent>
          <ToasterTitle>{title}</ToasterTitle>
          <ToasterMessage>{message}</ToasterMessage>
        </ToasterContent>
      </ToasterGrid>
      <ToasterCountdown showing={showing} status={status} />
    </ToasterStyled>
  )
}
