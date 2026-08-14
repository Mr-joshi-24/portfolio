import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const coursework = [
  'Data Structures', 'Algorithms', 'Operating Systems', 'Database Management',
  'Computer Networks', 'Software Engineering', 'Object Oriented Programming',
]

const Education = () => {
  return (
    <section id="education" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Education"
          subtitle="Academic foundation building the skills of tomorrow"
        />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-8 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-[80px]" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center mb-6 shadow-glow-blue">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>

                {/* Degree Info */}
                <h3 className="text-2xl font-bold text-cloud mb-1">Bachelor of Engineering</h3>
                <p className="text-lg text-primary-400 font-medium mb-1">Computer Science Engineering</p>
                <p className="text-dark-500 text-sm mb-6">Graduating 2028</p>

                {/* Coursework */}
                <div>
                  <h4 className="text-sm font-semibold text-dark-600 uppercase tracking-wider mb-3">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course, i) => (
                      <motion.span
                        key={course}
                        className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-white/5 text-dark-600 hover:text-cyan-glow hover:border-cyan-glow/20 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Education
