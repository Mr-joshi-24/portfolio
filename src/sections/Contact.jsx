import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle, FiGithub, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiDownload } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { socialLinks } from '../data/socialLinks'
import useStore from '../store/useStore'

const iconMap = { FiGithub, FiLinkedin, FiInstagram, FiMail }

const Contact = () => {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  const validate = (formData) => {
    const newErrors = {}
    if (!formData.get('user_name')?.trim()) newErrors.name = 'Name is required'
    if (!formData.get('user_email')?.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('user_email'))) newErrors.email = 'Invalid email'
    if (!formData.get('subject')?.trim()) newErrors.subject = 'Subject is required'
    if (!formData.get('message')?.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const newErrors = validate(formData)
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    setStatus('sending')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'demo',
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo' }
      )
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or just want to chat? Let's connect!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="left">
              <GlassCard tilt={false} className="p-6 md:p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-dark-600 mb-1.5">Name</label>
                      <input
                        type="text"
                        name="user_name"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.name ? 'border-red-500/50' : 'border-white/5 focus:border-cyan-glow/30'
                        } text-cloud text-sm placeholder:text-dark-400 outline-none transition-colors`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-dark-600 mb-1.5">Email</label>
                      <input
                        type="email"
                        name="user_email"
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.email ? 'border-red-500/50' : 'border-white/5 focus:border-cyan-glow/30'
                        } text-cloud text-sm placeholder:text-dark-400 outline-none transition-colors`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.subject ? 'border-red-500/50' : 'border-white/5 focus:border-cyan-glow/30'
                      } text-cloud text-sm placeholder:text-dark-400 outline-none transition-colors`}
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.message ? 'border-red-500/50' : 'border-white/5 focus:border-cyan-glow/30'
                      } text-cloud text-sm placeholder:text-dark-400 outline-none transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={status === 'sending'}
                    icon={
                      status === 'sending' ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      ) : status === 'success' ? (
                        <FiCheck />
                      ) : (
                        <FiSend />
                      )
                    }
                  >
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                  </Button>

                  {/* Status messages */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.p
                        className="text-green-400 text-sm text-center flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <FiCheck /> Thanks! I'll get back to you soon.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p
                        className="text-red-400 text-sm text-center flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <FiAlertCircle /> Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right">
              <div className="space-y-4">
                {/* Info card */}
                <GlassCard tilt={false} className="p-6">
                  <h3 className="text-lg font-semibold text-cloud mb-4">Let's Connect</h3>
                  <p className="text-dark-500 text-sm leading-relaxed mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <FiMail className="w-4 h-4 text-cyan-glow" />
                      <a href="mailto:joshikavy35@gmail.com" className="text-dark-500 hover:text-cyan-glow transition-colors">
                        joshikavy35@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FiMapPin className="w-4 h-4 text-cyan-glow" />
                      <span className="text-dark-500">Ahmedabad, Gujarat, India</span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    icon={<FiDownload />}
                    href="/Kavy_Joshi_Resume.pdf"
                    download="Kavy_Joshi_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume PDF
                  </Button>
                </GlassCard>

                {/* Social Links */}
                <GlassCard tilt={false} className="p-6">
                  <h3 className="text-sm font-semibold text-cloud uppercase tracking-wider mb-4">Social Profiles</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => {
                      const Icon = iconMap[social.icon]
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-xl glass border border-white/5 text-dark-500 hover:text-cyan-glow hover:border-cyan-glow/20 transition-all text-sm"
                          whileHover={{ x: 4 }}
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{social.name}</span>
                        </motion.a>
                      )
                    })}
                  </div>
                </GlassCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
