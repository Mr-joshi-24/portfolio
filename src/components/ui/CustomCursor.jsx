import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cursorVariant = useStore((s) => s.cursorVariant)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
      border: '2px solid rgba(0, 240, 255, 0.6)',
      x: position.x - 10,
      y: position.y - 10,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(0, 240, 255, 0.1)',
      border: '2px solid rgba(0, 240, 255, 0.8)',
      x: position.x - 24,
      y: position.y - 24,
    },
    text: {
      width: 120,
      height: 120,
      backgroundColor: 'rgba(0, 240, 255, 0.05)',
      border: '1px solid rgba(0, 240, 255, 0.3)',
      x: position.x - 60,
      y: position.y - 60,
      mixBlendMode: 'difference',
    },
    hidden: {
      width: 0,
      height: 0,
      x: position.x,
      y: position.y,
    },
  }

  // Don't show on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-glow rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{
          type: 'spring',
          stiffness: 1500,
          damping: 30,
          mass: 0.2,
        }}
        style={{ 
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.4)',
        }}
      />

      {/* Cursor glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9990]"
        animate={{
          x: position.x - 80,
          y: position.y - 80,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
        }}
        style={{
          opacity: isVisible ? 0.15 : 0,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
        }}
      />
    </>
  )
}

export default CustomCursor
