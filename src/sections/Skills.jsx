import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import { skillCategories } from '../data/skills'
import useStore from '../store/useStore'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with and continuously learn"
        />

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow-blue'
                  : 'glass text-dark-500 hover:text-cloud border border-white/5'
              }`}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow-blue'
                    : 'glass text-dark-500 hover:text-cloud border border-white/5'
                }`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.map((category, catIndex) => (
              <ScrollReveal key={category.id} delay={catIndex * 0.1}>
                <GlassCard className="p-6 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-cloud">{category.title}</h3>
                      <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${category.color} mt-1`} />
                    </div>
                  </div>

                  {/* Skills as Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill.name}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full glass border border-white/10 text-dark-500 hover:text-cloud hover:border-white/20 transition-all duration-300 cursor-default`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills
