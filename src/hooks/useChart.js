import { useState, useEffect } from 'react'
import { API_URL } from '../constants/index.js'

/**
 * Fetches chart data and exposes loading/error state. Aborts the in-flight request
 * on unmount or when `url` changes, so a stale response can never overwrite a newer one.
 * @param {string} [url=API_URL] - The endpoint to fetch.
 * @returns {{data: Array|null, loading: boolean, error: Error|null}}
 */
export default function useChartData(url = API_URL) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    /** Fetches the chart data, validates the shape, and updates state. */
    const fetchRecords = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`)
        const json = await res.json()
        if (!Array.isArray(json?.items) || !json.items.every((i) => Array.isArray(i?.points)))
          throw new Error('Malformed response')
        setData(json.items)
        setLoading(false)
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e)
        setLoading(false)
      }
    }
    fetchRecords()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
