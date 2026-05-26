import 'styled-components'
import type { MavenTheme } from 'utils/interfaces'

declare module 'styled-components' {
  export interface DefaultTheme extends MavenTheme {}
}
