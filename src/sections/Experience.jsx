import { motion } from 'framer-motion'
import { FiCode, FiBriefcase, FiCpu, FiTrendingUp } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const activities = [
  {
    icon: <FiCode className="w-5 h-5" />,
    title: 'Building Personal Projects',
    description: 'Actively developing full-stack applications and AI-powered systems.',
    status: 'active',
  },
  {
    icon: <FiTrendingUp className="w-5 h-5" />,
    title: 'Learning Full Stack Development',
    description: 'Deepening expertise in React, FastAPI, and modern web technologies.',
    status: 'active',
  },
  {
    icon: <FiCpu className="w-5 h-5" />,
    title: 'AI & ML Projects',
    description: 'Exploring machine learning models, prediction systems, and data science.',
    status: 'active',
  },
]

const availability = [
  { label: 'Open to Internship Opportunities', color: 'green' },
  { label: 'Available for Freelance Projects', color: 'cyan' },
]

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Experience"
          subtitle="What I'm currently working on and what I'm looking for"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Activities */}
          {activities.map((activity, i) => (
            <ScrollReveal key={activity.title} delay={i * 0.1}>
              <GlassCard tilt={false} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-cloud">{activity.title}</h3>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <p className="text-dark-500 text-sm">{activity.description}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}

          {/* Availability badges */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-3 justify-center pt-6">
              {availability.map((item) => (
                <motion.div
                  key={item.label}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full glass border ${
                    item.color === 'green'
                      ? 'border-green-500/20 text-green-400'
                      : 'border-cyan-glow/20 text-cyan-glow'
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    item.color === 'green' ? 'bg-green-400' : 'bg-cyan-glow'
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Experience
