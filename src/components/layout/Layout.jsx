import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import useScrollProgress from '../../hooks/useScrollProgress'
import useStore from '../../store/useStore'
import { scrollToSection } from '../../utils/helpers'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../ui/CustomCursor'
import LoadingScreen from '../ui/LoadingScreen'
import CommandPalette from '../ui/CommandPalette'

const Layout = ({ children }) => {
  const { isLoading } = useStore()
  const { progress } = useScrollProgress()
  const [showHireMe, setShowHireMe] = useState(false)

  useEffect(() => {
    setShowHireMe(progress > 20)
  }, [progress])

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Command Palette */}
      <CommandPalette />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Main content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hire Me CTA */}
      <AnimatePresence>
        {showHireMe && !isLoading && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-midnight-bg bg-gradient-to-r from-electric to-cyan-glow shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            <FiSend className="w-4 h-4" />
            Hire Me
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Layout
