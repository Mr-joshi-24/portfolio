import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiDroplet } from 'react-icons/fi'
import useStore from '../../store/useStore'

const themes = [
  { id: 'dark', label: 'Dark', icon: FiMoon },
  { id: 'midnight', label: 'Midnight', icon: FiDroplet },
  { id: 'aurora', label: 'Aurora', icon: FiSun },
]

const ThemeSwitcher = () => {
  const { theme, setTheme } = useStore()

  return (
    <div className="flex items-center gap-1 p-1 rounded-full glass border border-white/5">
      {themes.map((t) => {
        const Icon = t.icon
        const isActive = theme === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`relative p-2 rounded-full transition-colors duration-300 ${
              isActive ? 'text-cyan-glow' : 'text-dark-500 hover:text-dark-700'
            }`}
            title={t.label}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-glow/10 border border-cyan-glow/20"
                layoutId="theme-indicator"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <Icon className="relative z-10 w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
