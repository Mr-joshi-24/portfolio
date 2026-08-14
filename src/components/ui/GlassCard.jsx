import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

const GlassCard = ({ children, className = '', tilt = true, glowColor = 'cyan', ...props }) => {
  const glowColors = {
    cyan: 'hover:border-cyan-glow/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]',
    blue: 'hover:border-primary-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
    purple: 'hover:border-aurora-purple/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
    pink: 'hover:border-aurora-pink/20 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]',
    green: 'hover:border-aurora-green/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
  }

  const CardWrapper = tilt ? Tilt : 'div'
  const tiltProps = tilt ? {
    tiltMaxAngleX: 5,
    tiltMaxAngleY: 5,
    scale: 1.02,
    transitionSpeed: 2000,
    glareEnable: true,
    glareMaxOpacity: 0.1,
    glareColor: '#00F0FF',
    glarePosition: 'all',
    glareBorderRadius: '16px',
  } : {}

  return (
    <CardWrapper {...tiltProps}>
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl
          bg-dark-100/40 backdrop-blur-xl
          border border-white/[0.06]
          transition-all duration-500 ease-out
          ${glowColors[glowColor] || glowColors.cyan}
          ${className}
        `}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </CardWrapper>
  )
}

export default GlassCard
