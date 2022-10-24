import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

import { ToasterView } from './Toaster.view'

export const Toaster = () => {
  const toaster = useSelector((state: State) => state.toaster)

  return (
    <ToasterView showing={toaster.showing} status={toaster.status} title={toaster.title} message={toaster.message} />
  )
}
