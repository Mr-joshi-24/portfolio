import { useState, useEffect, useRef } from 'react'

const useInView = (options = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasBeenInView(true)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options,
      }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [options.threshold, options.rootMargin])

  return { ref, isInView, hasBeenInView }
}

export default useInView
