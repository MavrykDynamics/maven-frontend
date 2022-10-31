import Icon from '../Icon/Icon.view'
import { StyledScrollToTop } from './ScrollToTop.style'

export const ScrollToTop = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <StyledScrollToTop show={isVisible}>
      <Icon id="arrow_scroll_top" />
    </StyledScrollToTop>
  )
}
