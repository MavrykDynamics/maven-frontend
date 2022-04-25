import { useEffect, useState } from 'react'

export type MediumFeedDataType = {
  id: number
  title: string
  link: string
  description: string
  img: string
}

export default function useGetMediumFeed(): {
  mediumFeedData: MediumFeedDataType[]
  errorMessage: string
  loading: boolean
} {
  const fetchUrl =
    process.env.NODE_ENV === 'production' ? 'http://localhost:3002/medium-feed' : 'http://localhost:3002/medium-feed'
  const [mediumFeedData, setMediumFeedData] = useState<MediumFeedDataType[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGetMediumFeed = async () => {
    try {
      setLoading(true)
      const response = await fetch(fetchUrl)
      if (response.ok) {
        const data = await response.json()
        setMediumFeedData(data)
      } else {
        throw new Error()
      }
    } catch {
      setErrorMessage('Could not get data. Try reload page')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetMediumFeed()
  }, [])

  return {
    mediumFeedData,
    errorMessage,
    loading,
  }
}
