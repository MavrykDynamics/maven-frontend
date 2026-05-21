import { useAppDispatch } from 'app/App.hooks'
import litepaper from './Litepaper.markdown.md'
import { useWindowScrollPosition } from '@n8tb1t/use-scroll-position'
import Markdown from 'markdown-to-jsx'
import { useCallback, useEffect, useState } from 'react'
import { HashLink } from 'app/App.components/HashLink/HashLink.view'
import { LitepaperGrid, LitepaperIndex, LitepaperLink, LitepaperMarkdown, LitepaperStyled } from './Litepaper.style'
import { useSelector } from 'react-redux'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { State } from 'utils/interfaces'
import { LIGHT_THEME, toggleRPCNodePopup } from '../../redux/actions/preferences.action'
import { SettingPopup } from 'app/App.components/SettingsPopup/SettingsPopup'

type LitepaperTops = Record<string, number>

type LitepaperTableOfContentsItem = {
  id: number
  title: string
  hashLinkId: string
  next: string | null
  children?: LitepaperTableOfContentsItem[] | null
}

const SELECTED_SECTION_OFFSET = 110
const SCROLL_TO_SECTION_OFFSET = 100

export const LitepaperView = () => {
  const { changeNodePopupOpen, themeSelected } = useSelector((state: State) => state.preferences)
  const dispatch = useAppDispatch()
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [dispatch])
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [dispatch])
  const darkThemeEnabled = themeSelected !== LIGHT_THEME
  const [isIOS, setIsIOS] = useState(true)
  const [tops, setTops] = useState<LitepaperTops>({
    abstract: 0,
  })
  const setImagesByTheme = useCallback(() => {
    if (darkThemeEnabled) {
      // $("#exitFee-img").attr('src', 'images/eq-k.png');
      // $("#eq-k-img").attr('src', 'images/eq-k.png');
      // $("#eq-mli-img").attr('src', 'images/eq-k.png');
      // $("#eq-mliFee-img").attr('src', 'images/eq-k.png');
    }
  }, [darkThemeEnabled])

  useEffect(() => {
    if (!window.location.hash) {
      window.scroll(0, 0)
    }

    setImagesByTheme()
    setTops(getLitepaperTops())
    setIsIOS(
      ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform),
    )
  }, [setImagesByTheme])

  useWindowScrollPosition(
    () => {
      setTops(getLitepaperTops())
    },
    { wait: 300 },
  )

  if (isIOS && changeNodePopupOpen) {
    ;<SettingPopup isModalOpened showBackdrop={false} closeModal={closeModalHandler} />
  }

  return (
    <>
      {/*<SettingPopup isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />*/}
      <LitepaperStyled>
        <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
        <LitepaperGrid>
          <div>
            <LitepaperIndex>
              {LitepaperTableOfContentsItems.map((listItem) => (
                <LitepaperToCHeaderItem key={`${listItem.id}${listItem.title}`} item={listItem} tops={tops} />
              ))}
            </LitepaperIndex>
          </div>
          <LitepaperMarkdown>
            <Markdown children={litepaper} />
          </LitepaperMarkdown>
        </LitepaperGrid>
      </LitepaperStyled>
    </>
  )
}

type LitepaperToCItemProps = {
  item: LitepaperTableOfContentsItem
  tops: LitepaperTops
}

const LitepaperToCHeaderItem = ({ item, tops }: LitepaperToCItemProps) => {
  const { children } = item

  return (
    <li>
      <LitepaperToCSubItem item={item} tops={tops} />
      {children && (
        <ul className="nav">
          {children.map((child) => (
            <li key={`child${child.id}`}>
              <LitepaperToCSubItem item={child} tops={tops} />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

const LitepaperToCSubItem = ({ item, tops }: LitepaperToCItemProps) => {
  const { title, hashLinkId, next } = item
  const currentTop = tops[hashLinkId] ?? Number.POSITIVE_INFINITY
  const nextTop = next ? tops[next] ?? Number.POSITIVE_INFINITY : Number.POSITIVE_INFINITY
  const linkIsSelected = currentTop <= SELECTED_SECTION_OFFSET && (!next || nextTop > SELECTED_SECTION_OFFSET)

  return (
    <LitepaperLink $selected={linkIsSelected}>
      <HashLink to={`#${hashLinkId}`} scroll={scrollToLitepaperSection}>
        {title}
      </HashLink>
    </LitepaperLink>
  )
}

const scrollToLitepaperSection = (element: HTMLElement) => {
  window.scrollTo({
    behavior: 'smooth',
    top: element.getBoundingClientRect().top + window.pageYOffset - SCROLL_TO_SECTION_OFFSET,
  })
}

const getLitepaperSectionIds = (items: LitepaperTableOfContentsItem[]): string[] =>
  items.flatMap((item) => [item.hashLinkId, ...(item.children ? getLitepaperSectionIds(item.children) : [])])

const getLitepaperTops = () =>
  LitepaperSectionIds.reduce<LitepaperTops>((sectionTops, sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
      sectionTops[sectionId] = section.getBoundingClientRect().top
    }

    return sectionTops
  }, {})

const LitepaperTableOfContentsItems: LitepaperTableOfContentsItem[] = [
  { id: 0, title: 'Abstract', hashLinkId: 'abstract', next: 'problem', children: null },
  { id: 1, title: 'Problem', hashLinkId: 'problem', next: 'solution', children: null },
  { id: 2, title: 'Solution', hashLinkId: 'solution', next: 'multi-asset-backed-loans', children: null },
  {
    id: 3,
    title: 'Multi-Asset Backed Loans',
    hashLinkId: 'multi-asset-backed-loans',
    next: 'peer-to-peer-lending',
    children: [
      {
        id: 31,
        title: 'Peer To Peer Lending',
        hashLinkId: 'peer-to-peer-lending',
        next: 'lending-earning-yield-on-your-assets',
      },
      {
        id: 32,
        title: 'Lending: Earning Yield on Your Assets',
        hashLinkId: 'lending-earning-yield-on-your-assets',
        next: 'borrowing-single--multi-collateral-vaults',
      },
      {
        id: 33,
        title: 'Borrowing: Single & Multi-Collateral Vaults',
        hashLinkId: 'borrowing-single--multi-collateral-vaults',
        next: 'multi-collateral-vaults',
      },
      {
        id: 34,
        title: 'Multi-Collateral Vaults',
        hashLinkId: 'multi-collateral-vaults',
        next: 'liquidations',
      },
      {
        id: 35,
        title: 'Liquidations',
        hashLinkId: 'liquidations',
        next: 'satellites-governance-and-the-decentralized-oracle',
      },
    ],
  },
  {
    id: 4,
    title: 'Satellites, Governance, and the Decentralized Oracle',
    hashLinkId: 'satellites-governance-and-the-decentralized-oracle',
    next: 'satellites',
    children: [
      {
        id: 41,
        title: 'Satellites',
        hashLinkId: 'satellites',
        next: 'governance',
      },
      {
        id: 42,
        title: 'Governance',
        hashLinkId: 'governance',
        next: 'satellite-delegations',
      },
      {
        id: 43,
        title: 'Satellite Delegations',
        hashLinkId: 'satellite-delegations',
        next: 'the-decentralized-oracle',
      },
      {
        id: 44,
        title: 'The Decentralized Oracle',
        hashLinkId: 'the-decentralized-oracle',
        next: 'mvn-and-smvn-doorman-module',
      },
    ],
  },
  {
    id: 5,
    title: 'MVN and sMVN (Doorman Module)',
    hashLinkId: 'mvn-and-smvn-doorman-module',
    next: 'what-is-mvn-and-how-does-it-differ-from-smvn',
    children: [
      {
        id: 51,
        title: 'What is MVN and how does it differ from sMVN?',
        hashLinkId: 'what-is-mvn-and-how-does-it-differ-from-smvn',
        next: 'obtaining-smvn',
      },
      {
        id: 52,
        title: 'Obtaining sMVN',
        hashLinkId: 'obtaining-smvn',
        next: 'converting-smvn-back-to-mvn-exit-fees',
      },
      {
        id: 53,
        title: 'Converting sMVN back to MVN (exit fees)',
        hashLinkId: 'converting-smvn-back-to-mvn-exit-fees',
        next: 'governance--treasury',
      },
    ],
  },
  {
    id: 6,
    title: 'Governance & Treasury',
    hashLinkId: 'governance--treasury',
    next: 'decentralization',
    children: [
      {
        id: 61,
        title: 'Decentralization',
        hashLinkId: 'decentralization',
        next: 'core-governance',
      },
      {
        id: 62,
        title: 'Core Governance',
        hashLinkId: 'core-governance',
        next: 'threshold-governance',
      },
      {
        id: 63,
        title: 'Threshold Governance',
        hashLinkId: 'threshold-governance',
        next: 'voting-power',
      },
      {
        id: 64,
        title: 'Voting Power',
        hashLinkId: 'voting-power',
        next: 'voting-with-satellites-electoral-delegates',
      },
      {
        id: 65,
        title: 'Voting with Satellites (electoral delegates)',
        hashLinkId: 'voting-with-satellites-electoral-delegates',
        next: 'treasury',
      },
      {
        id: 66,
        title: 'Treasury',
        hashLinkId: 'treasury',
        next: 'maven-council',
      },
    ],
  },
  {
    id: 7,
    title: 'Maven Council',
    hashLinkId: 'maven-council',
    next: 'emergency-governance--break-glass',
    children: null,
  },
  {
    id: 8,
    title: 'Emergency Governance & Break Glass',
    hashLinkId: 'emergency-governance--break-glass',
    next: 'emergency-governance',
    children: [
      {
        id: 81,
        title: 'Emergency Governance',
        hashLinkId: 'emergency-governance',
        next: 'break-glass-council',
      },
      {
        id: 82,
        title: 'Break Glass Council',
        hashLinkId: 'break-glass-council',
        next: 'break-glass-access-control-layer',
      },
      {
        id: 83,
        title: 'Break Glass: Access Control Layer',
        hashLinkId: 'break-glass-access-control-layer',
        next: 'yield-farming',
      },
    ],
  },
  { id: 9, title: 'Yield Farming', hashLinkId: 'yield-farming', next: 'tokenomics', children: null },
  {
    id: 10,
    title: 'Tokenomics',
    hashLinkId: 'tokenomics',
    next: 'revenue-model',
    children: [
      {
        id: 101,
        title: 'Revenue Model',
        hashLinkId: 'revenue-model',
        next: 'token-flow',
      },
      {
        id: 102,
        title: 'Token Flow',
        hashLinkId: 'token-flow',
        next: null,
      },
    ],
  },
]

const LitepaperSectionIds = getLitepaperSectionIds(LitepaperTableOfContentsItems)
