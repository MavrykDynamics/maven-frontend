import { ComponentProps, MouseEvent, useEffect, useRef } from 'react'
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
  if (!hash) return false

  const element = document.getElementById(decodeURIComponent(hash))
  if (!element) return false

  if (scroll) {
    scroll(element)
    return true
  }

  element.scrollIntoView({ behavior: 'smooth' })
  return true
}

const requestHashScroll = (hash: string, scroll?: (element: HTMLElement) => void) => {
  let retryTimer: number | null = null
  const animationFrame = window.requestAnimationFrame(() => {
    const didScroll = scrollToHash(hash, scroll)

    if (!didScroll) {
      retryTimer = window.setTimeout(() => scrollToHash(hash, scroll), 100)
    }
  })

  return () => {
    window.cancelAnimationFrame(animationFrame)

    if (retryTimer !== null) {
      window.clearTimeout(retryTimer)
    }
  }
}

export const HashLink = ({ to, scroll, onClick, ...props }: HashLinkProps) => {
  const location = useLocation()
  const hash = getHashFromTo(to)
  const locationKey = `${location.pathname}${location.search}${location.hash}`
  const lastScrolledLocation = useRef<string | null>(null)
  const scrollRef = useRef(scroll)

  useEffect(() => {
    scrollRef.current = scroll
  }, [scroll])

  useEffect(() => {
    if (!hash || location.hash.slice(1) !== hash || lastScrolledLocation.current === locationKey) {
      return
    }

    lastScrolledLocation.current = locationKey
    return requestHashScroll(hash, scrollRef.current)
  }, [hash, location.hash, locationKey])

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

    if (hash && location.hash.slice(1) === hash) {
      lastScrolledLocation.current = locationKey
      requestHashScroll(hash, scrollRef.current)
    }
  }

  return <Link {...props} to={to} onClick={handleClick} />
}
