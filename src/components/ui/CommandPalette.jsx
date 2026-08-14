import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import useStore from '../../store/useStore'
import { navLinks } from '../../data/socialLinks'
import { scrollToSection } from '../../utils/helpers'

const CommandPalette = () => {
  const { isCommandOpen, setCommandOpen } = useStore()

  const handleSelect = useCallback((id) => {
    scrollToSection(id)
    setCommandOpen(false)
  }, [setCommandOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen(!useStore.getState().isCommandOpen)
      }
      if (e.key === 'Escape') {
        setCommandOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setCommandOpen])

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
          />
          
          {/* Palette */}
          <motion.div
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-[9001] px-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <FiSearch className="text-dark-500 text-lg" />
                <span className="text-dark-500 text-sm flex-1">Navigate to section...</span>
                <kbd className="text-xs text-dark-500 bg-dark-200 px-2 py-0.5 rounded font-mono">ESC</kbd>
              </div>

              {/* Options */}
              <div className="max-h-64 overflow-y-auto py-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-cloud hover:bg-white/5 transition-colors"
                    onClick={() => handleSelect(link.id)}
                  >
                    <FiArrowRight className="text-primary-500 text-sm" />
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-xs text-dark-400">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
