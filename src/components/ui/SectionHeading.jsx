import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'

const SectionHeading = ({ title, subtitle, align = 'center', className = '' }) => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.3 })

  return (
    <div ref={ref} className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Decorative line */}
      <motion.div
        className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-glow/50" />
        <div className="w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-glow/50" />
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-cloud mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-dark-500 text-base md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeading
