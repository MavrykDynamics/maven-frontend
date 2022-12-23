import { FooterView } from './Footer.view'

type Props = {
  className?: string
}

export const Footer = ({ className }: Props) => {
  return <FooterView className={className} />
}
