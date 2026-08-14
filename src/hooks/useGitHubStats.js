import { useState, useEffect } from 'react'
import { githubStats as fallback } from '../data/stats'

const USERNAME = fallback.username
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const headers = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {}

/**
 * Fetches live GitHub stats for the configured username.
 * Falls back to the hardcoded values in src/data/stats.js if the API fails.
 *
 * Returns:
 *  data    – same shape as githubStats in stats.js but with live values
 *  loading – true while the first fetch is in-flight
 *  error   – Error object if fetch failed (data will be the fallback)
 */
export function useGitHubStats() {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        // 1. Fetch user profile (repos, followers, stars are aggregated here later)
        const userRes = await fetch(
          `https://api.github.com/users/${USERNAME}`,
          { headers }
        )
        if (!userRes.ok) throw new Error(`GitHub API: ${userRes.status}`)
        const user = await userRes.json()

        // 2. Fetch all public repos to compute stars and language breakdown
        const reposRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
          { headers }
        )
        if (!reposRes.ok) throw new Error(`GitHub repos API: ${reposRes.status}`)
        const repos = await reposRes.json()

        if (cancelled) return

        // --- Compute derived values ---

        // Total stars across all repos
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

        // Language byte counts → percentage
        const langBytes = {}
        repos.forEach((r) => {
          if (r.language) {
            langBytes[r.language] = (langBytes[r.language] || 0) + (r.size || 1)
          }
        })
        const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1
        const langColors = {
          JavaScript: '#F7DF1E',
          Python: '#3572A5',
          Java: '#b07219',
          HTML: '#E34F26',
          'Jupyter Notebook': '#DA5B0B',
          TypeScript: '#3178C6',
          CSS: '#563d7c',
          C: '#555555',
          'C++': '#f34b7d',
          Ruby: '#701516',
          Go: '#00ADD8',
          Rust: '#dea584',
          Swift: '#ffac45',
          Kotlin: '#A97BFF',
          Dart: '#00B4AB',
          Shell: '#89e051',
        }
        const languages = Object.entries(langBytes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100),
            color: langColors[name] || '#71717A',
          }))

        // Normalize percentages to sum to 100
        const total = languages.reduce((s, l) => s + l.percentage, 0)
        if (total !== 100 && languages.length > 0) {
          languages[0].percentage += 100 - total
        }

        // Top repos by stars, then by push date
        const pinnedRepos = [...repos]
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at)
          )
          .filter((r) => !r.fork)
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            description: r.description || 'No description provided.',
            language: r.language || 'Unknown',
            stars: r.stargazers_count,
            url: r.html_url,
          }))

        setData({
          ...fallback,
          repos: user.public_repos,
          followers: user.followers,
          stars: totalStars,
          // Contributions are not directly in the REST API without authentication;
          // we approximate with public events count (fallback keeps original value
          // if we can't get a better number).
          contributions: fallback.contributions,
          languages: languages.length > 0 ? languages : fallback.languages,
          pinnedRepos: pinnedRepos.length > 0 ? pinnedRepos : fallback.pinnedRepos,
        })
      } catch (err) {
        if (!cancelled) {
          console.warn('[useGitHubStats] Falling back to static data:', err.message)
          setError(err)
          // data stays as fallback (already initialized)
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
