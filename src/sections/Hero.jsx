import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Typed from 'typed.js'
import HeroScene from '../components/3d/HeroScene'
import Button from '../components/ui/Button'
import { getGreeting, getCurrentTime, scrollToSection } from '../utils/helpers'
import useStore from '../store/useStore'
import { FiArrowDown, FiDownload, FiSend } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'

const Hero = () => {
  const typedRef = useRef(null)
  const typedElement = useRef(null)
  const [time, setTime] = useState(getCurrentTime())
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  useEffect(() => {
    typedRef.current = new Typed(typedElement.current, {
      strings: [
        'Full Stack Developer',
        'AI Enthusiast',
        'Python Developer',
        'MERN Stack Developer',
        'FastAPI Developer',
        'Machine Learning Learner',
        'Problem Solver',
        'Tech Explorer',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })

    return () => typedRef.current?.destroy()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTime(getCurrentTime()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 section-max section-padding w-full">
        <div className="max-w-3xl">
          {/* Greeting & Time */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span className="text-sm font-mono text-dark-500 bg-dark-200/50 px-3 py-1 rounded-full border border-white/5">
              {getGreeting()} · {time}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
              <span className="text-cloud">Hi, I'm </span>
              <span className="text-gradient">Kavy Joshi</span>
            </h1>
          </motion.div>

          {/* Typed Subtitle */}
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-medium text-dark-600 mb-6 h-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <span ref={typedElement} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-dark-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            Passionate Computer Science Engineering student focused on building modern web applications, 
            AI-powered systems, and scalable software. I enjoy solving real-world problems using 
            Full Stack Development, Machine Learning, and clean user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <Button
              variant="glow"
              size="lg"
              icon={<HiOutlineSparkles />}
              onClick={() => scrollToSection('projects')}
            >
              Explore Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<FiDownload />}
              href="#"
            >
              Download Resume
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<FiSend />}
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <span className="text-dark-400 text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown className="text-cyan-glow w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-bg to-transparent z-[5]" />
    </section>
  )
}

export default Hero
