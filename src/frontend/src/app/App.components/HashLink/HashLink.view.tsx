import { ComponentProps, MouseEvent, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

type HashLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  to: string
  scroll?: (element: HTMLElement) => void
}

const getHashFromTo = (to: string) => {
  const hashIndex = to.indexOf('#')
  return hashIndex === -1 ? '' : to.slice(hashIndex + 1)
}

const scrollToHash = (hash: string, scroll?: (element: HTMLElement) => void) => {
  if (!hash) return

  const element = document.getElementById(decodeURIComponent(hash))
  if (!element) return

  if (scroll) {
    scroll(element)
    return
  }

  element.scrollIntoView({ behavior: 'smooth' })
}

const requestHashScroll = (hash: string, scroll?: (element: HTMLElement) => void) => {
  window.setTimeout(() => scrollToHash(hash, scroll), 0)
  window.setTimeout(() => scrollToHash(hash, scroll), 100)
}

export const HashLink = ({ to, scroll, onClick, ...props }: HashLinkProps) => {
  const location = useLocation()
  const hash = getHashFromTo(to)

  useEffect(() => {
    if (location.hash.slice(1) === hash) {
      requestHashScroll(hash, scroll)
    }
  }, [hash, location.hash, location.pathname, scroll])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    requestHashScroll(hash, scroll)
  }

  return <Link {...props} to={to} onClick={handleClick} />
}
