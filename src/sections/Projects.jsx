import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { projects, projectCategories } from '../data/projects'
import useStore from '../store/useStore'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Projects"
          subtitle="A collection of things I've built and am building"
        />

        {/* Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.key
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow-blue'
                    : 'glass text-dark-500 hover:text-cloud border border-white/5'
                }`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <GlassCard className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-cloud">{project.title}</h3>
                        {project.comingSoon && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <span className="text-dark-400 text-xs font-mono">{project.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-dark-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 text-dark-600 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] text-dark-400"
                      >
                        • {feature}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <Button variant="ghost" size="sm" icon={<FiGithub />} href={project.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </Button>
                    {!project.comingSoon && (
                      <Button variant="ghost" size="sm" icon={<FiExternalLink />} href={project.live}>
                        Preview
                      </Button>
                    )}
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

export default Projects
