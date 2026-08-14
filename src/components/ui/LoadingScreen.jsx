import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const { isLoading, setLoading } = useStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-midnight-bg"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Animated background gradients */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-primary-500/10 rounded-full blur-[120px] animate-aurora" />
            <div className="absolute w-[400px] h-[400px] -bottom-32 -right-32 bg-cyan-glow/10 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-5s' }} />
          </div>

          {/* Logo */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(0, 240, 255, 0.2))',
                  border: '2px solid rgba(0, 240, 255, 0.3)',
                  boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(0, 240, 255, 0.2)',
                    '0 0 80px rgba(0, 240, 255, 0.4)',
                    '0 0 40px rgba(0, 240, 255, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-gradient">KJ</span>
              </motion.div>
              
              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-3xl border border-cyan-glow/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-glow rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-dark-600 text-sm font-mono mb-8 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Initializing Portfolio
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-48 h-1 bg-dark-200 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #0066FF, #00F0FF)',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* Progress text */}
          <motion.p
            className="text-dark-500 text-xs font-mono mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
