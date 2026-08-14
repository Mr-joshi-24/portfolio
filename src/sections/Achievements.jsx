import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import { achievements } from '../data/achievements'

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and recognitions along the journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, i) => (
            <ScrollReveal key={achievement.title} delay={i * 0.08}>
              <motion.div
                className="glass-card p-6 text-center h-full flex flex-col items-center"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{
                    backgroundColor: `${achievement.color}15`,
                    border: `1px solid ${achievement.color}30`,
                  }}
                >
                  {achievement.icon}
                </div>

                {/* Badge */}
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3"
                  style={{
                    color: achievement.color,
                    backgroundColor: `${achievement.color}10`,
                    border: `1px solid ${achievement.color}20`,
                  }}
                >
                  {achievement.badge}
                </span>

                {/* Title */}
                <h3 className="text-sm font-semibold text-cloud mb-2">{achievement.title}</h3>
                <p className="text-dark-400 text-xs leading-relaxed">{achievement.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
