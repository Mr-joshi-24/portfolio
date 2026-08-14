import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import { fadeIn } from '../../utils/animations'

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '', once = true }) => {
  const { ref, hasBeenInView, isInView } = useInView({ threshold: 0.1 })
  const shouldAnimate = once ? hasBeenInView : isInView

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeIn(direction, delay)}
      initial="hidden"
      animate={shouldAnimate ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
