import {MavrykTheme} from 'utils/interfaces'

export const backgroundColor = '#160E3F' //'#FFFFFF'
export const containerColor = '#1C1C3F' //'#F7F9FD'
export const borderColor = '#4F457C'
export const textColor = '#fff' //'#000000'
export const subTextColor = '#fff' //'#29264C'
export const backgroundTextColor = '#191919'
export const placeholderColor = '#9090A0'
export const primaryColor = '#7068AA'
export const secondaryColor = '#73d7c3'
export const downColor = '#F90021'
export const selectedColor = '#aea3ff3d'
export const btnLightColor = '#86D4C9'
export const headerColor = '#38237C'
export const subHeaderColor = '#8D86EB'
export const coralColor = '#FF8486'
export const titleColor = '#503EAA'
export const labelColor = '#77a4f2cc'
export const darkColor = '#080628'
export const skyColor = '#77A4F2'
export const cyanColor = '#86D4C9'
export const connectWalletSecondary = '#EEEAF4'
export const infoColor = '#00C2FF'
export const silverColor = '#C0DBFF'
export const warningColor = '#FF7A00'
export const upColor = '#27AE60'
export const dangerColor = '#FF8486'
export const awaitingColor = '#FFCA43'
export const silverTwoColor = '#CDCDCD'
export const lightTextColor = '#D0CFD9'
export const dropDownColor = '#0000007a'

export const darkMode: MavrykTheme = {
    // new color schema
    nSelectedColor: '#8D86EB',
    linksAndButtons: '#88D1C3',
    nBackgroundColor: '#121212',
    cards: '#1E1E1E',
    mainHeadingText: '#EBF0FF',
    subHeadingText: '#BBBBBB',
    primaryText: '#EBF0FF',
    menuButtonText: '#D2D2D2',
    menuButtonSelected: '#8D86EB',
    topbarMenuAndPlaceholders: '#C0DBFF',
    regularText: '#BBBBBB',
    strokeColor: '#8D86EB',
    divider: '#282F3A',
    messagesBackground: '#38237C',
    strokeCards: 'rgba(0, 0, 0, 0.2)',
    footerColor: '#121212',
    strokeForForms: '#8D86EB',
    // tabs
    forTabs: 'linear-gradient(90deg, #86D4C9 0.31%, #8D86EB 99.97%)',

    // custom color schema - variables which are not in figma but which are needed
    tabSecondColor: '#D0CFD9',

    // old color schema
    whatMakesBackground: '/images/what-makes-dark.svg',
    calculatorBackground: '/images/calculator-bg-dark.svg',
    featuresBackground: '/images/features-bg-dark.svg',
    teamCityDecor: '/images/team/team-city-dark.svg',
    teamDecor1: '/images/team/team-decor-1-dark.svg',
    teamDecor2: '/images/team/team-decor-2-dark.svg',
    teamDecor3: '/images/team/team-decor-3-dark.svg',
    teamDecor4: '/images/team/team-decor-4-dark.svg',
    mobileBackground: 'images/background/primary-dark-mob-bg.svg',
    topDesktopBackground: 'images/background/top-dark-desktop-bg.svg',
    bottomDesktopBackground: 'images/background/bottom-dark-desktop-bg.svg',
    mavrykFinanceBg: 'images/mavryk-finance.svg',
    starsBachground: '/images/stars-bg-dark.svg',
    sliderTabBgGradient: 'linear-gradient(90deg, #86d4c9 0.31%, #8d86eb 99.97%)',
    satellitesGradient: 'linear-gradient(180deg, #160E3F 3.55%, #321F71 103.84%);',
    backgroundGradient: 'linear-gradient(0deg, #8D86EB 0%, #38237C 80%, #160E3F 100%)',
    skyGradientTransparent:
        'linear-gradient(0deg, #285A8A 8.7%, #38237C 42.22%, #2D1C6A 52.19%, #221555 68.5%, #1B1149 83.9%, #160E3F00 99.3%)',
    skyGradient:
        'linear-gradient(0deg, #285A8A 8.7%, #38237C 42.22%, #2D1C6A 52.19%, #221555 68.5%, #1B1149 83.9%, #160E3F 99.3%)',
    shineAnimationGradient: `linear-gradient(to right, ${subHeaderColor} 0, ${cyanColor} 10%, ${subHeaderColor} 20%)`,
    subHeaderColor,
    backgroundColor,
    containerColor,
    textColor,
    subTextColor: '#fff',
    placeholderColor: '#F7F9FD',
    primaryColor: '#8D86EB',
    upColor: '#00E205',
    downColor: '#F90021',
    litepaperLinkColor: '#73d7c3',
    navColor: '#86D4C9',
    inputBorderColor: titleColor,
    headerTeam: '#fff',
    headerColor: '#fff',
    headerSectionsColor: '#fff',
    headerDarkColor: '#fff',
    darkestBackroundColor: '#080628',
    darkBackroundColor: '#160E3F',
    labelColor,
    headingColor: subHeaderColor,
    btnBackroundColor: btnLightColor,
    btnColor: backgroundColor,
    linkedinLinkColor: '#77A4F2',
    socialBackroundColor: '#503EAA',
    socialColor: '#C0DBFF',
    inputColor: subHeaderColor,
    btnBackroundNewsColor: '#86D4C9',
    btnNewsColor: '#38237C',
    inputNewsBg: 'rgba(8, 6, 40, 0.5)',
    inputNewsColor: '#77A4F2',
    roadmapValueColor: '#77A4F2',
    arrowStrokeColor: '#8D86EB',
    socialsColor: '#EBF0FF',
    lbBorder: '#503EAA',
    toggleButtonBg: 'transparent',
    toggleButtonColor: '#8D86EB',
    toggleButtonColorSelected: '#160E3F',
    toggleButtonBgSelected: '#8D86EB',
    inputTextColor: '#c0dbff',
    settingsConfigmBG: cyanColor,
    topBarLinkColor: cyanColor,
    topBarLinkColorActive: '#8D86EB',
    infoColor: '#00C2FF',
    warningColor: '#FF7A00',
    tooltipColor: '#9EA9E8',
    selectedColor: cyanColor,
    tooltipBg: '#38237C',
    priceImpact: cyanColor,
    footerText: silverColor,
    policyPopupTextColor: '#d0cfd9',
    tooltipValue: cyanColor,
    tooltipDate: '#8d86eb',
    headerSkyColor: skyColor,
    walletDetailsAddress: '#77A4F2',
    walletDetailsSubtext: '#77A4F2',
    scrollToTop: '#77A4F2',
    settingsPopupText: silverTwoColor,
    settingsPopupTextDescr: silverTwoColor,
    theme: 'dark',
    primaryTextCardColor: '#77A4F2',
    secondaryTextCardColor: cyanColor,
    secondaryBgCardColor: headerColor,
    headingCardColor: subHeaderColor,
    headingSecondaryCardColor: '#77A4F2',
    headingThirdCardColor: '#77A4F2',
    headingFourthCardColor: cyanColor,
    borderCard: '#503EAA',
    primaryButtonColor: btnLightColor,
    sliderBorderColor: '#8D86EB',
    sliderTextColor: '#8D86EB',
    sliderBgColor: '#080628',
    sliderTabBgColor: 'linear-gradient(90deg, #86d4c9 0.31%, #8d86eb 99.97%)',
    skyColor,
}

export const lightMode: MavrykTheme = {
    // new color schema
    nSelectedColor: '#03C9A3',
    linksAndButtons: '#8D86EB',
    nBackgroundColor: '#F7F9FD',
    cards: '#FFFFFF',
    mainHeadingText: '#1F1F1F',
    subHeadingText: '#5B616E',
    primaryText: '#1F1F1F',
    menuButtonText: '#4C4C4C',
    menuButtonSelected: '#86D4C9',
    topbarMenuAndPlaceholders: '#8D86EB',
    regularText: '#5B616E',
    strokeColor: '#8D86EB',
    divider: 'rgba(0, 0, 0, 0.1)',
    messagesBackground: '#E1E6FF',
    strokeCards: 'rgba(0, 0, 0, 0.1)',
    footerColor: '#FFFFFF',
    strokeForForms: '#1F1F1F',
    // tabs
    forTabs: 'linear-gradient(90deg, #03C9A3 0.31%, #8D86EB 99.97%)',

    // custom color schema - variables which are not in figma but which are needed
    tabSecondColor: '#1F1F1F',

    // old color schema
    whatMakesBackground: '/images/what-makes-light.svg',
    calculatorBackground: '/images/calculator-bg-light.svg',
    featuresBackground: '/images/features-bg-light.svg',
    teamCityDecor: '/images/team/team-city-light.svg',
    teamDecor1: '/images/team/team-decor-1-light.svg',
    teamDecor2: '/images/team/team-decor-2-light.svg',
    teamDecor3: '/images/team/team-decor-3-light.svg',
    teamDecor4: '/images/team/team-decor-4-light.svg',
    subscribeBachground: '/images/subscribe-bg-light.svg',
    mobileBackground: 'images/background/primary-light-mob-bg.svg',
    topDesktopBackground: 'images/background/top-light-desktop-bg.svg',
    bottomDesktopBackground: 'images/background/bottom-light-desktop-bg.svg',
    topDarkDesktopBg: 'images/background/top-dark-desktop-bg.svg',
    bottomDarkDesktopBg: 'images/background/bottom-dark-desktop-bg.svg',
    mavrykFinanceBg: 'images/mavryk-finance.svg',
    starsBachground: '/images/stars-bg-light.svg',
    sliderTabBgGradient: 'linear-gradient(90deg, #86d4c9 0.31%, #8d86eb 99.97%)',
    satellitesGradient: 'linear-gradient(180deg, #FFFFFF 48.18%, #86D4C9 103.84%)',
    skyGradientTransparent: 'linear-gradient(0deg, #77A4F2 8.7%, #FFFFFF 99.3%)',
    skyGradient: 'linear-gradient(0deg, #77A4F2 8.7%, #FFFFFF 99.3%)',
    backgroundGradient: 'linear-gradient(0deg, #EBF0FF 16.12%, #97C9C6 61.98%, #6598C9 100%)',
    shineAnimationGradient: `linear-gradient(to right, ${subHeaderColor} 0, ${cyanColor} 10%, ${subHeaderColor} 20%)`,
    subHeaderColor,
    backgroundColor: '#fff',
    containerColor: '#DEE7F7',
    textColor: '#080628',
    subTextColor: '#29264C',
    placeholderColor: '#7068AA',
    primaryColor: '#7068AA',
    upColor: 'green',
    downColor: '#F90021',
    litepaperLinkColor: '#38237C',
    navColor: titleColor,
    inputBorderColor: '#C0DBFF',
    headerColor,
    darkestBackroundColor: '#ebf0ff',
    darkBackroundColor: '#fff',
    labelColor: titleColor,
    headingColor: titleColor,
    headerSectionsColor: titleColor,
    btnBackroundColor: titleColor,
    btnBackroundNewsColor: '#38237C',
    linkedinLinkColor: '#160E3F',
    socialBackroundColor: '#F7F9FD',
    socialColor: headerColor,
    inputColor: titleColor,
    btnColor: '#F7F9FD',
    headerDarkColor: headerColor,
    roadmapValueColor: headerColor,
    headerTeam: '#27007A',
    priceImpact: '#27007A',
    btnNewsColor: '#fff',
    inputNewsBg: 'rgba(255, 255, 255, 0.5)',
    inputNewsColor: '#080628',
    arrowStrokeColor: '#77A4F2',
    socialsColor: headerColor,
    lbBorder: '#77A4F2',
    toggleButtonBg: '#EBF0FF',
    walletDetailsAddress: '#27007A',
    toggleButtonColor: '#27007A',
    toggleButtonColorSelected: '#FFFFFF  ',
    toggleButtonBgSelected: '#503EAA',
    inputTextColor: '#503EAA',
    settingsConfigmBG: 'transparent',
    topBarLinkColor: '#27007A',
    topBarLinkColorActive: '#77A4F2',
    infoColor: '#00C2FF',
    warningColor: '#FF7A00',
    tooltipColor: '#9EA9E8',
    selectedColor: '#77A4F2',
    tooltipBg: '#38237C',
    footerText: '#38237C',
    policyPopupTextColor: '#27007A',
    walletDetailsSubtext: '#8D86EB',
    tooltipValue: '#FFFFFF  ',
    tooltipDate: '#FFFFFF  ',
    chartTooltipBg: '#503EAA',
    scrollToTop: '#27007A',
    headerSkyColor: darkColor,
    settingsPopupText: '#27007A',
    settingsPopupTextDescr: '#8D86EB',
    theme: 'light',
    primaryTextCardColor: headerColor,
    secondaryTextCardColor: skyColor,
    secondaryBgCardColor: '#EBF0FF',
    headingCardColor: '#27007A',
    headingSecondaryCardColor: '#27007A',
    headingThirdCardColor: '#38237C',
    headingFourthCardColor: '#27007A',
    borderCard: '#503EAA',
    primaryButtonColor: '#27007A',
    sliderBorderColor: '#503EAA',
    sliderTextColor: '#27007A',
    sliderBgColor: '#EBF0FF',
    sliderTabBgColor: '#27007A',
    skyColor,
}

export const spaceMode: MavrykTheme = {
    // new color schema
    nSelectedColor: '#8D86EB',
    linksAndButtons: '#86D4C9',
    nBackgroundColor: '#080628',
    cards: '#160E3F',
    mainHeadingText: '#CDCDCD',
    subHeadingText: '#D0CFD9',
    primaryText: '#77A4F2',
    menuButtonText: '#86D4C9',
    menuButtonSelected: '#8D86EB',
    topbarMenuAndPlaceholders: '#C0DBFF',
    regularText: '#D0CFD9',
    strokeColor: '#503EAA',
    divider: '#503EAA',
    messagesBackground: '#38237C',
    strokeCards: '#503EAA',
    footerColor: '#080628',
    strokeForForms: '#503EAA',
    // tabs
    forTabs: 'linear-gradient(90deg, #86D4C9 0.31%, #8D86EB 99.97%)',

    // custom color schema - variables which are not in figma but which are needed
    tabSecondColor: '#D0CFD9',

    // old color schema
    whatMakesBackground: '/images/what-makes-dark.svg',
    calculatorBackground: '/images/calculator-bg-dark.svg',
    featuresBackground: '/images/features-bg-dark.svg',
    teamCityDecor: '/images/team/team-city-dark.svg',
    teamDecor1: '/images/team/team-decor-1-dark.svg',
    teamDecor2: '/images/team/team-decor-2-dark.svg',
    teamDecor3: '/images/team/team-decor-3-dark.svg',
    teamDecor4: '/images/team/team-decor-4-dark.svg',
    subscribeBachground: '/images/subscribe-bg-dark.svg',
    mobileBackground: 'images/background/primary-dark-mob-bg.svg',
    topDesktopBackground: 'images/background/top-dark-desktop-bg.svg',
    bottomDesktopBackground: 'images/background/bottom-dark-desktop-bg.svg',
    mavrykFinanceBg: 'images/mavryk-finance.svg',
    starsBachground: '/images/stars-bg-dark.svg',
    sliderTabBgGradient: 'linear-gradient(90deg, #86d4c9 0.31%, #8d86eb 99.97%)',
    satellitesGradient: 'linear-gradient(180deg, #160E3F 3.55%, #321F71 103.84%);',
    backgroundGradient: 'linear-gradient(0deg, #8D86EB 0%, #38237C 80%, #160E3F 100%)',
    skyGradientTransparent:
        'linear-gradient(0deg, #285A8A 8.7%, #38237C 42.22%, #2D1C6A 52.19%, #221555 68.5%, #1B1149 83.9%, #160E3F00 99.3%)',
    skyGradient:
        'linear-gradient(0deg, #285A8A 8.7%, #38237C 42.22%, #2D1C6A 52.19%, #221555 68.5%, #1B1149 83.9%, #160E3F 99.3%)',
    shineAnimationGradient: `linear-gradient(to right, ${subHeaderColor} 0, ${cyanColor} 10%, ${subHeaderColor} 20%)`,
    subHeaderColor,
    backgroundColor,
    containerColor,
    textColor,
    subTextColor: '#fff',
    placeholderColor: '#F7F9FD',
    primaryColor: '#8D86EB',
    upColor: '#00E205',
    downColor: '#F90021',
    litepaperLinkColor: '#73d7c3',
    navColor: '#86D4C9',
    inputBorderColor: titleColor,
    headerTeam: '#fff',
    headerColor: '#fff',
    headerSectionsColor: '#fff',
    headerDarkColor: '#fff',
    darkestBackroundColor: '#080628',
    darkBackroundColor: '#160E3F',
    labelColor,
    headingColor: subHeaderColor,
    btnBackroundColor: btnLightColor,
    btnColor: backgroundColor,
    linkedinLinkColor: '#77A4F2',
    walletDetailsAddress: '#77A4F2',
    socialBackroundColor: '#503EAA',
    walletDetailsSubtext: '#77A4F2',
    socialColor: '#C0DBFF',
    inputColor: subHeaderColor,
    btnBackroundNewsColor: '#86D4C9',
    btnNewsColor: '#38237C',
    inputNewsBg: 'rgba(8, 6, 40, 0.5)',
    inputNewsColor: '#77A4F2',
    roadmapValueColor: '#77A4F2',
    arrowStrokeColor: '#8D86EB',
    socialsColor: '#EBF0FF',
    lbBorder: '#503EAA',
    toggleButtonBg: 'transparent',
    toggleButtonColor: '#8D86EB',
    toggleButtonColorSelected: '#160E3F',
    toggleButtonBgSelected: '#8D86EB',
    inputTextColor: '#c0dbff',
    settingsConfigmBG: cyanColor,
    topBarLinkColor: cyanColor,
    selectedColor: cyanColor,
    topBarLinkColorActive: '#8D86EB',
    infoColor: '#00C2FF',
    warningColor: '#FF7A00',
    tooltipColor: '#9EA9E8',
    tooltipBg: '#38237C',
    priceImpact: cyanColor,
    footerText: silverColor,
    policyPopupTextColor: '#d0cfd9',
    tooltipValue: cyanColor,
    tooltipDate: '#8d86eb',
    chartTooltipBg: '#160e3f',
    scrollToTop: '#77A4F2',
    theme: 'space',
    headerSkyColor: skyColor,
    settingsPopupText: silverTwoColor,
    settingsPopupTextDescr: silverTwoColor,
    primaryTextCardColor: '#D0CFD9',
    secondaryTextCardColor: cyanColor,
    secondaryBgCardColor: headerColor,
    headingCardColor: silverTwoColor,
    headingSecondaryCardColor: '#D0CFD9',
    headingThirdCardColor: '#77A4F2',
    headingFourthCardColor: cyanColor,
    borderCard: '#503EAA',
    primaryButtonColor: btnLightColor,
    sliderBorderColor: '#8D86EB',
    sliderTextColor: '#8D86EB',
    sliderBgColor: '#080628',
    sliderTabBgColor: 'linear-gradient(90deg, #86d4c9 0.31%, #8d86eb 99.97%)',
    skyColor,
}

export default {
    light: lightMode,
    dark: darkMode,
    space: spaceMode,
}
