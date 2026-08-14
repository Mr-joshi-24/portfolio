import { useState, useEffect } from 'react'
import { leetcodeStats as fallback } from '../data/stats'

const USERNAME = fallback.username

/**
 * Fetches live LeetCode stats via the community proxy.
 * Proxy: https://leetcode-stats-api.herokuapp.com/{username}
 *
 * Falls back to the hardcoded values in src/data/stats.js if the API fails.
 *
 * Returns:
 *  data    – same shape as leetcodeStats in stats.js but with live values
 *  loading – true while the first fetch is in-flight
 *  error   – Error object if fetch failed (data will be the fallback)
 */
export function useLeetCodeStats() {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${USERNAME}`
        )
        if (!res.ok) throw new Error(`LeetCode API: ${res.status}`)

        const json = await res.json()
        if (json.status === 'error') throw new Error(json.message || 'LeetCode API error')

        if (cancelled) return

        // Map API response to our shape
        const totalSolved = json.totalSolved ?? fallback.totalSolved
        const ranking = json.ranking
          ? `Rank #${json.ranking.toLocaleString()}`
          : fallback.ranking

        setData({
          ...fallback,
          totalSolved,
          easy: json.easySolved ?? fallback.easy,
          medium: json.mediumSolved ?? fallback.medium,
          hard: json.hardSolved ?? fallback.hard,
          ranking,
        })
      } catch (err) {
        if (!cancelled) {
          console.warn('[useLeetCodeStats] Falling back to static data:', err.message)
          setError(err)
          // data stays as fallback
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
