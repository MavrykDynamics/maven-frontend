import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Page } from 'styles/components'

// prettier-ignore
import { IdeasSection } from './Ideas.style'

export const IdeasView = () => {
  const handleFetchData = async () => {
    try {
      const data = await axios.get('https://medium.com/feed/@Mavryk_Finance')
      console.log('%c ||||| data', 'color:yellowgreen', data)
    } catch (error) {
      console.log('%c ||||| error', 'color:yellowgreen', error)
    }
  }

  useEffect(() => {
    //handleFetchData()
  }, [])
  return <IdeasSection>IdeasSection</IdeasSection>
}
