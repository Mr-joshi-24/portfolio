/**
 * Get greeting based on current hour
 */
export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return 'Good Night'
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  if (hour < 21) return 'Good Evening'
  return 'Good Night'
}

/**
 * Get formatted current time
 */
export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Smooth scroll to element by ID
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Konami code detector
 */
export const createKonamiDetector = (callback) => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ]
  let konamiIndex = 0

  const handler = (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        callback()
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  }

  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}

/**
 * Determine if it's day or night for dynamic lighting
 */
export const isDayTime = () => {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18
}

/**
 * Format number with suffix (1000 -> 1K+)
 */
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Linear interpolation
 */
export const lerp = (start, end, amount) => start + (end - start) * amount

/**
 * Map value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
