import { useWindowScroll } from 'react-use'
import Icon from '../Icon/Icon.view'
import { StyledScrollToTop } from './ScrollToTop.style'

export const ScrollToTop = () => {
  const { y } = useWindowScroll()

  return (
    <StyledScrollToTop show={y >= 80}>
      <Icon id="arrow_scroll_top" />
    </StyledScrollToTop>
  )
}
