/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import litepaper from '!raw-loader!./Litepaper.markdown.md'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Markdown from 'markdown-to-jsx'
import { useCallback, useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { LitepaperGrid, LitepaperIndex, LitepaperLink, LitepaperMarkdown, LitepaperStyled } from './Litepaper.style'
import { useDispatch, useSelector } from 'react-redux'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { State } from 'utils/interfaces'
import { LIGHT_THEME, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { SettingPopup } from 'app/App.components/SettingsPopup/SettingsPopup'

export const LitepaperView = () => {
  const { changeNodePopupOpen, themeSelected } = useSelector((state: State) => state.preferences)
  const dispatch = useDispatch()
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])
  const darkThemeEnabled = themeSelected !== LIGHT_THEME
  const [isIOS, setIsIOS] = useState(true)
  const [tops, setTops] = useState<any>({
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
    window.scroll(0, 0)
    setImagesByTheme()
    setIsIOS(
      ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform),
    )
  }, [setImagesByTheme])

  useScrollPosition(
    () => {
      // prettier-ignore
      //@ts-ignore/*-//
      setTops({
          'abstract': document.getElementById('abstract')?.getBoundingClientRect().top!,
          'problem': document.getElementById('problem')?.getBoundingClientRect().top!,
          'solution': document.getElementById('solution')?.getBoundingClientRect().top!,
          'multi-asset-backed-loans': document.getElementById('multi-asset-backed-loans')?.getBoundingClientRect().top!,
          'peer-to-peer-lending': document.getElementById('peer-to-peer-lending')?.getBoundingClientRect().top!,
          'lending-earning-yield-on-your-assets': document.getElementById('lending-earning-yield-on-your-assets')?.getBoundingClientRect().top!,
          'borrowing-single--multi-collateral-vaults': document.getElementById('borrowing-single--multi-collateral-vaults')?.getBoundingClientRect().top!,
          'multi-collateral-vaults': document.getElementById('multi-collateral-vaults')?.getBoundingClientRect().top!,
          'liquidations': document.getElementById('liquidations')?.getBoundingClientRect().top!,
          'satellites-governance-and-the-decentralized-oracle': document.getElementById('satellites-governance-and-the-decentralized-oracle')?.getBoundingClientRect().top!,
          'satellites': document.getElementById('satellites')?.getBoundingClientRect().top!,
          'governance': document.getElementById('governance')?.getBoundingClientRect().top!,
          'satellite-delegations': document.getElementById('satellite-delegations')?.getBoundingClientRect().top!,
          'the-decentralized-oracle': document.getElementById('the-decentralized-oracle')?.getBoundingClientRect().top!,
          'mvk-and-smvk-doorman-module': document.getElementById('mvk-and-smvk-doorman-module')?.getBoundingClientRect().top!,
          'what-is-mvk-and-how-does-it-differ-from-smvk': document.getElementById('what-is-mvk-and-how-does-it-differ-from-smvk')?.getBoundingClientRect().top!,
          'obtaining-smvk': document.getElementById('obtaining-smvk')?.getBoundingClientRect().top!,
          'converting-smvk-back-to-mvk-exit-fees': document.getElementById('converting-smvk-back-to-mvk-exit-fees')?.getBoundingClientRect().top!,
          'governance--treasury': document.getElementById('governance--treasury')?.getBoundingClientRect().top!,
          'decentralization': document.getElementById('decentralization')?.getBoundingClientRect().top!,
          'core-governance': document.getElementById('core-governance')?.getBoundingClientRect().top!,
          'threshold-governance': document.getElementById('threshold-governance')?.getBoundingClientRect().top!,
          'voting-power': document.getElementById('voting-power')?.getBoundingClientRect().top!,
          'voting-with-satellites-electoral-delegates': document.getElementById('voting-with-satellites-electoral-delegates')?.getBoundingClientRect().top!,
          'treasury': document.getElementById('treasury')?.getBoundingClientRect().top!,
          'mavryk-council': document.getElementById('mavryk-council')?.getBoundingClientRect().top!,
          'emergency-governance--break-glass': document.getElementById('emergency-governance--break-glass')?.getBoundingClientRect().top!,
          'emergency-governance': document.getElementById('emergency-governance')?.getBoundingClientRect().top!,
          'break-glass-council': document.getElementById('break-glass-council')?.getBoundingClientRect().top!,
          'break-glass-access-control-layer': document.getElementById('break-glass-access-control-layer')?.getBoundingClientRect().top!,
          'yield-farming': document.getElementById('yield-farming')?.getBoundingClientRect().top!,
          'tokenomics': document.getElementById('tokenomics')?.getBoundingClientRect().top!,
          'revenue-model': document.getElementById('revenue-model')?.getBoundingClientRect().top!,
          'token-flow': document.getElementById('token-flow')?.getBoundingClientRect().top!,
            })
    },
    [],
    undefined,
    false,
    300,
  )

  const LitepaperToCHeaderItem = (props: any) => {
    const { id, children } = props
    return (
      <li key={`header${id}`}>
        <LitepaperToCSubItem key={id.toString()} {...props} />
        {children && (
          <ul className="nav">
            {children.map((child: any) => (
              <li key={`child${child.id}`}>
                <LitepaperToCSubItem key={`child${child.id}-${child.hashLinkId}`} {...child} />
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }
  const LitepaperToCSubItem = (props: any) => {
    const { id, title, hashLinkId, next } = props
    const linkIsSelected = next !== null ? tops[hashLinkId] <= 110 && tops[next] > 110 : tops[hashLinkId] <= 110
    return (
      <LitepaperLink selected={linkIsSelected} key={`${hashLinkId}${id}`}>
        <HashLink
          to={`#${hashLinkId}`}
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 100,
            })
          }
        >
          {title}
        </HashLink>
      </LitepaperLink>
    )
  }

  if (isIOS && changeNodePopupOpen) {
    ;<SettingPopup isModalOpened showBackdrop={false} closeModal={closeModalHandler} />
  }

  return (
    <>
      <SettingPopup isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />
      <LitepaperStyled>
        <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
        <LitepaperGrid>
          <div>
            <LitepaperIndex>
              {LitepaperTableOfContentsItems.map((listItem) => (
                <LitepaperToCHeaderItem key={`${listItem.id}${listItem.title}`} {...listItem} />
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

const LitepaperTableOfContentsItems = [
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
        next: 'mvk-and-smvk-doorman-module',
      },
    ],
  },
  {
    id: 5,
    title: 'MVK and sMVK (Doorman Module)',
    hashLinkId: 'mvk-and-smvk-doorman-module',
    next: 'what-is-mvk-and-how-does-it-differ-from-smvk',
    children: [
      {
        id: 51,
        title: 'What is MVK and how does it differ from sMVK?',
        hashLinkId: 'what-is-mvk-and-how-does-it-differ-from-smvk',
        next: 'obtaining-smvk',
      },
      {
        id: 52,
        title: 'Obtaining sMVK',
        hashLinkId: 'obtaining-smvk',
        next: 'converting-smvk-back-to-mvk-exit-fees',
      },
      {
        id: 53,
        title: 'Converting sMVK back to MVK (exit fees)',
        hashLinkId: 'converting-smvk-back-to-mvk-exit-fees',
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
        next: 'mavryk-council',
      },
    ],
  },
  {
    id: 7,
    title: 'Mavryk Council',
    hashLinkId: 'mavryk-council',
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
