import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2, className = '' }) => {
  const [count, setCount] = useState(0)
  const { ref, hasBeenInView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (!hasBeenInView) return

    let start = 0
    const end = parseInt(value)
    const incrementTime = (duration * 1000) / end
    const step = Math.max(1, Math.floor(end / 100))

    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, Math.max(incrementTime * step, 16))

    return () => clearInterval(timer)
  }, [hasBeenInView, value, duration])

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={hasBeenInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}

export default AnimatedCounter
