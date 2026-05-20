import { useDispatch } from 'react-redux'
import type { AppDispatch } from './App.controller'

export const useAppDispatch = () => useDispatch<AppDispatch>()
