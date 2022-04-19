import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Page } from 'styles/components'

// prettier-ignore
import { IdeasSection } from './Ideas.style'

export const IdeasView = () => {
  const handleFetchData = async () => {
    try {
      //github.com/Medium/medium-api-docs
      const clientId = ''
      const state = 'test'
      const redirectUri = '/'
      const authUrl = `https://medium.com/m/oauth/authorize?client_id=${clientId}&scope=basicProfile,publishPost&state=${state}&response_type=code&redirect_uri=${redirectUri}`

      const userId = ''

      const publicationsUrl = `https://api.medium.com/v1/users/${userId}/publications`

      const data = await axios.get('https://medium.com/feed/@Mavryk_Finance', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'text/xml',
        // },
        // body: JSON.stringify({}),
      })
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
