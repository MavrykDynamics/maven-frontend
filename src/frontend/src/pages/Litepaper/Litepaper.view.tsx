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

export const LitepaperView = () => {
  const themeSelected = useSelector((state: State) => state.preferences.themeSelected)
  const dispatch = useDispatch()
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])

  const darkThemeEnabled = themeSelected !== LIGHT_THEME

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
          'lending-earning-yield-on-your-assets': document.getElementById('lendings-earning-yield-on-your-assets')?.getBoundingClientRect().top!,
          'borrowing-single--multi-collateral-vaults': document.getElementById('borrowing-single-multi-collateral-vaults')?.getBoundingClientRect().top!,
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

  return (
    <LitepaperStyled>
      <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
      <LitepaperGrid>
        <div>
          <LitepaperIndex>
            <li>
              <LitepaperLink selected={tops['abstract'] <= 110 && tops['problem'] > 110}>
                <HashLink
                  to="#abstract"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Abstract
                </HashLink>
              </LitepaperLink>
            </li>
            <li>
              <LitepaperLink selected={tops['problem'] <= 110 && tops['solution'] > 110}>
                <HashLink
                  to="#problem"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Problem
                </HashLink>
              </LitepaperLink>
            </li>
            <li>
              <LitepaperLink selected={tops['solution'] <= 110 && tops['multi-asset-backed-loans'] > 110}>
                <HashLink
                  to="#solution"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Solution
                </HashLink>
              </LitepaperLink>
            </li>
            <li>
              <LitepaperLink selected={tops['multi-asset-backed-loans'] <= 110 && tops['peer-to-peer-lending'] > 110}>
                <HashLink
                  to="#multi-asset-backed-loans"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Multi-Asset Backed Loans
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink
                    selected={tops['peer-to-peer-lending'] <= 110 && tops['lending-earning-yield-on-your-assets'] > 110}
                  >
                    <HashLink
                      to="#peer-to-peer-lending"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Peer To Peer Lending
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={
                      tops['lending-earning-yield-on-your-assets'] <= 110 &&
                      tops['borrowing-single--multi-collateral-vaults'] > 110
                    }
                  >
                    <HashLink
                      to="#lending-earning-yield-on-your-assets"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Lending: Earning Yield on Your Assets
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={
                      tops['borrowing-single--multi-collateral-vaults'] <= 110 && tops['multi-collateral-vaults'] > 110
                    }
                  >
                    <HashLink
                      to="#borrowing-single--multi-collateral-vaults"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Borrowing: Single & Multi-Collateral Vaults
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink selected={tops['multi-collateral-vaults'] <= 110 && tops['liquidations'] > 110}>
                    <HashLink
                      to="#multi-collateral-vaults"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Multi-Collateral Vaults
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={
                      tops['liquidations'] <= 110 && tops['satellites-governance-and-the-decentralized-oracle'] > 110
                    }
                  >
                    <HashLink
                      to="#liquidations"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Liquidations
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
            <li>
              <LitepaperLink
                selected={tops['satellites-governance-and-the-decentralized-oracle'] <= 110 && tops['satellites'] > 110}
              >
                <HashLink
                  to="#satellites-governance-and-the-decentralized-oracle"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Satellites, Governance, and the Decentralized Oracle
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink selected={tops['satellites'] <= 110 && tops['governance'] > 110}>
                    <HashLink
                      to="#satellites"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Satellites
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink selected={tops['governance'] <= 110 && tops['satellite-delegations'] > 110}>
                    <HashLink
                      to="#governance"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Governance
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['satellite-delegations'] <= 110 && tops['the-decentralized-oracle'] > 110}
                  >
                    <HashLink
                      to="#satellite-delegations"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Satellite Delegations
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['the-decentralized-oracle'] <= 110 && tops['mvk-and-smvk-doorman-module'] > 110}
                  >
                    <HashLink
                      to="#the-decentralized-oracle"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      The Decentralized Oracle
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
            <li>
              <LitepaperLink
                selected={
                  tops['mvk-and-smvk-doorman-module'] <= 110 &&
                  tops['what-is-mvk-and-how-does-it-differ-from-smvk'] > 110
                }
              >
                <HashLink
                  to="#mvk-and-smvk-doorman-module"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  MVK and sMVK (Doorman Module)
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink
                    selected={
                      tops['what-is-mvk-and-how-does-it-differ-from-smvk'] <= 110 && tops['obtaining-smvk'] > 110
                    }
                  >
                    <HashLink
                      to="#what-is-mvk-and-how-does-it-differ-from-smvk"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      What is MVK and how does it differ from sMVK?
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['obtaining-smvk'] <= 110 && tops['converting-smvk-back-to-mvk-exit-fees'] > 110}
                  >
                    <HashLink
                      to="#obtaining-smvk"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Obtaining sMVK
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={
                      tops['converting-smvk-back-to-mvk-exit-fees'] <= 110 && tops['governance--treasury'] > 110
                    }
                  >
                    <HashLink
                      to="#converting-smvk-back-to-mvk-exit-fees"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Converting sMVK back to MVK (exit fees)
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
            <li>
              <LitepaperLink selected={tops['governance--treasury'] <= 110 && tops['decentralization'] > 110}>
                <HashLink
                  to="#governance--treasury"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Governance & Treasury
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink selected={tops['decentralization'] <= 110 && tops['voting-power'] > 110}>
                    <HashLink
                      to="#decentralization"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Decentralization
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['voting-power'] <= 110 && tops['voting-with-satellites-electoral-delegates'] > 110}
                  >
                    <HashLink
                      to="#voting-power"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Voting power
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['voting-with-satellites-electoral-delegates'] <= 110 && tops['treasury'] > 110}
                  >
                    <HashLink
                      to="#voting-with-satellites-electoral-delegates"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Voting with Satellites (electoral delegates)
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink selected={tops['treasury'] <= 110 && tops['mavryk-council'] > 110}>
                    <HashLink
                      to="#treasury"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Treasury
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
            <li>
              <LitepaperLink
                selected={tops['mavryk-council'] <= 110 && tops['emergency-governance--break-glass'] > 110}
              >
                <HashLink
                  to="#mavryk-council"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Mavryk Council
                </HashLink>
              </LitepaperLink>
            </li>
            <li>
              <LitepaperLink
                selected={tops['emergency-governance--break-glass'] <= 110 && tops['emergency-governance'] > 110}
              >
                <HashLink
                  to="#emergency-governance--break-glass"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Emergency Governance & Break Glass
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink selected={tops['emergency-governance'] <= 110 && tops['break-glass-council'] > 110}>
                    <HashLink
                      to="#emergency-governance"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Emergency Governance
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['break-glass-council'] <= 110 && tops['break-glass-access-control-layer'] > 110}
                  >
                    <HashLink
                      to="#break-glass-council"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Break Glass Council
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink
                    selected={tops['break-glass-access-control-layer'] <= 110 && tops['yield-farming'] > 110}
                  >
                    <HashLink
                      to="#break-glass-access-control-layer"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Break Glass: Access Control Layer
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
            <li>
              <LitepaperLink selected={tops['yield-farming'] <= 110 && tops['tokenomics'] > 110}>
                <HashLink
                  to="#yield-farming"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Yield Farming
                </HashLink>
              </LitepaperLink>
            </li>
            <li>
              <LitepaperLink selected={tops['tokenomics'] <= 110 && tops['revenue-model'] > 110}>
                <HashLink
                  to="#tokenomics"
                  scroll={(el) =>
                    window.scrollTo({
                      behavior: 'smooth',
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    })
                  }
                >
                  Tokenomics
                </HashLink>
              </LitepaperLink>
              <ul className="nav">
                <li>
                  <LitepaperLink selected={tops['revenue-model'] <= 110 && tops['token-flow'] > 110}>
                    <HashLink
                      to="#revenue-model"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Revenue Model
                    </HashLink>
                  </LitepaperLink>
                </li>
                <li>
                  <LitepaperLink selected={tops['token-flow'] <= 110}>
                    <HashLink
                      to="#token-flow"
                      scroll={(el) =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                        })
                      }
                    >
                      Token Flow
                    </HashLink>
                  </LitepaperLink>
                </li>
              </ul>
            </li>
          </LitepaperIndex>
        </div>
        <LitepaperMarkdown>
          <Markdown children={litepaper} />
        </LitepaperMarkdown>
      </LitepaperGrid>
    </LitepaperStyled>
  )
}
