import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { HIDE_TOASTER } from 'redux/action.types'
import { State } from 'utils/interfaces'

import { ToasterView } from './Toaster.view'

export const Toaster = () => {
  const dispatch = useDispatch()
  const toaster = useSelector((state: State) => state.toaster)

  const closeCallback = () => {
    dispatch({ type: HIDE_TOASTER })
  }

  return (
    <ToasterView
      showing={toaster.showing}
      status={toaster.status}
      title={toaster.title}
      message={toaster.message}
      closeCallback={closeCallback}
    />
  )
}
