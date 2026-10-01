import { useState, useEffect } from 'react'
import { API_URL } from '../constants/index.js'
import { isValidChartData } from '../utils/validateChartData.js'

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
    const abortController = new AbortController()
    /** Fetches the chart data, validates the shape, and updates state. */
    const fetchChartData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url, { signal: abortController.signal })
        // check status BEFORE parsing — a 500 with an HTML error page would make
        // response.json() throw a confusing parse error that hides the real status.
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`)
        const payload = await response.json()
        if (!isValidChartData(payload)) throw new Error('Malformed response')
        setData(payload.items)
        setLoading(false)
      } catch (caughtError) {
        // aborted requests reject here too — swallow silently so a stale fetch
        // can't flip loading/error after the newer effect has already taken over.
        if (caughtError.name === 'AbortError') return
        setError(caughtError)
        setLoading(false)
      }
    }
    fetchChartData()

    // abort on unmount or when `url` changes — prevents stale responses from
    // overwriting fresher data (classic race condition in effect-based fetching).
    return () => abortController.abort()
  }, [url])

  return { data, loading, error }
}
