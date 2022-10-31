export const getWertOptions = (
  commodity: string,
  setPopupActive: (open: boolean) => void,
  showErrorToast: () => void,
) => ({
  partner_id: '01G0MCBQFJE47YZ0SECRKM81CD',
  commodity,
  container_id: 'wert-io-popup-wrapper',
  color_background: 'transparent',
  color_buttons: '#86D4C9',
  color_buttons_text: '#160E3F',
  color_secondary_buttons: '#86D4C9',
  color_secondary_buttons_text: '#160E3F',
  color_main_text: '#8D86EB',
  color_secondary_text: '#77A4F2',
  color_icons: '#8D86EB',
  color_links: '#86D4C9',
  color_success: '#86D4C9',
  color_warning: '#F79E1B',
  color_error: '#EB001B',
  theme: 'dark',
  height: 600,
  width: 400,
  listeners: {
    loaded: () => setPopupActive(true),
    error: () => {
      showErrorToast()
      setPopupActive(false)
    },
    close: () => setPopupActive(false),
  },
})
