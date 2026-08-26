import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi'
import { socialLinks, navLinks } from '../../data/socialLinks'
import { scrollToSection } from '../../utils/helpers'
import useStore from '../../store/useStore'

const iconMap = {
  FiGithub, FiLinkedin, FiInstagram, FiMail,
}

const Footer = () => {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  return (
    <footer className="relative border-t border-white/5">
      {/* Wave separator */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 40" className="w-full h-10" preserveAspectRatio="none">
          <path
            d="M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z"
            fill="rgba(0, 240, 255, 0.03)"
          />
        </svg>
      </div>

      <div className="section-max section-padding !py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <span className="text-2xl font-black text-gradient">KJ</span>
            <p className="text-dark-500 text-sm mt-3 leading-relaxed max-w-xs">
              Passionate CS Engineering student building modern web applications, AI-powered systems, and scalable software.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cloud mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.slice(0, 8).map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-dark-500 hover:text-cyan-glow transition-colors text-left py-1"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/Kavy_Joshi_Resume.pdf"
                download="Kavy_Joshi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-glow/80 hover:text-cyan-glow transition-colors text-left py-1 font-medium"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                📄 Resume PDF
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-cloud mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-500 hover:text-cyan-glow hover:border-cyan-glow/20 transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.1 }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-xs flex items-center gap-1">
            © {new Date().getFullYear()} Kavy Joshi. Built with <FiHeart className="w-3 h-3 text-red-400" /> and lots of ☕
          </p>
          
          {/* Back to top */}
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-xs text-dark-500 hover:text-cyan-glow transition-colors group"
            whileHover={{ y: -2 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Back to top
            <FiArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
