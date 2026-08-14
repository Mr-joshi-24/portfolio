import { useState, useEffect } from 'react'

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const currentProgress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0
      setProgress(currentProgress)
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, isScrolled }
}

export default useScrollProgress
