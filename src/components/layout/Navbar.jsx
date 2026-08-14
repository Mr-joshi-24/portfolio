import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCommand } from 'react-icons/fi'
import useScrollProgress from '../../hooks/useScrollProgress'
import useStore from '../../store/useStore'
import { navLinks } from '../../data/socialLinks'
import { scrollToSection } from '../../utils/helpers'
import ThemeSwitcher from '../ui/ThemeSwitcher'

const Navbar = () => {
  const { progress, isScrolled } = useScrollProgress()
  const { activeSection, isMobileMenuOpen, setMobileMenuOpen, setCommandOpen, setCursorVariant } = useStore()

  const handleNavClick = useCallback((id) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }, [setMobileMenuOpen])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'py-2 glass shadow-lg shadow-black/20'
            : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="relative group"
            onClick={(e) => { e.preventDefault(); handleNavClick('home') }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-black text-gradient tracking-tight">KJ</span>
            <div className="absolute -inset-2 rounded-lg bg-cyan-glow/0 group-hover:bg-cyan-glow/5 transition-colors duration-300" />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeSection === link.id
                    ? 'text-cyan-glow'
                    : 'text-dark-500 hover:text-cloud'
                }`}
              >
                {activeSection === link.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-cyan-glow/5 border border-cyan-glow/10"
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Command palette shortcut */}
            <button
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-dark-500 rounded-lg glass border border-white/5 hover:border-white/10 transition-colors"
              onClick={() => setCommandOpen(true)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <FiCommand className="w-3 h-3" />
              <span className="font-mono">Ctrl+K</span>
            </button>

            {/* Theme switcher */}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-cloud hover:text-cyan-glow transition-colors rounded-lg"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-midnight-bg/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            
            {/* Menu */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-100/80 backdrop-blur-2xl border-l border-white/5 p-8 pt-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? 'text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/10'
                        : 'text-dark-500 hover:text-cloud hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <ThemeSwitcher />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
