import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

const Button = ({ children, variant = 'primary', size = 'md', href, onClick, className = '', icon, disabled = false, ...props }) => {
  const [ripple, setRipple] = useState(null)
  const buttonRef = useRef(null)
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  const handleRipple = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    })
    setTimeout(() => setRipple(null), 600)
  }

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-primary-400/20',
    secondary: 'bg-transparent text-cloud border border-white/10 hover:border-cyan-glow/30 hover:bg-white/5 hover:shadow-glow-sm',
    ghost: 'bg-white/5 text-cloud border border-white/10 hover:bg-white/10 hover:border-white/20',
    glow: 'bg-gradient-to-r from-electric to-cyan-glow text-midnight-bg font-semibold shadow-glow hover:shadow-glow-lg border-0',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  }

  const Component = href ? 'a' : 'button'

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={(e) => {
        handleRipple(e)
        onClick?.(e)
      }}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-medium tracking-wide
        transition-all duration-300 ease-out
        overflow-hidden select-none
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-none'}
        ${className}
      `}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-inherit">
        <motion.div
          className="absolute inset-0 -translate-x-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          whileHover={{
            translateX: ['100%', '-100%'],
            transition: { duration: 0.6, ease: 'easeInOut' },
          }}
        />
      </div>

      {/* Ripple */}
      {ripple && (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            opacity: 0.5,
          }}
          animate={{
            width: 300,
            height: 300,
            x: ripple.x - 150,
            y: ripple.y - 150,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Icon */}
      {icon && <span className="text-lg">{icon}</span>}

      {/* Label */}
      <span className="relative z-10">{children}</span>
    </Component>
  )
}

export default Button
