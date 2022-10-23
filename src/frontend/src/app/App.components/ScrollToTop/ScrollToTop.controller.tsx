import { useWindowScroll } from 'react-use'
import Icon from '../Icon/Icon.view'
import { StyledScrollToTop } from './ScrollToTop.style'

export const ScrollToTop = () => {
  const { y } = useWindowScroll()
  return (
    <StyledScrollToTop show={y <= document.body.scrollHeight - 800}>
      <Icon id="arrow_scroll_top" />
    </StyledScrollToTop>
  )
}
