import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiBookOpen, FiCheck } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import { featuredProject } from '../data/projects'
import useStore from '../store/useStore'

const FeaturedProject = () => {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  return (
    <section id="featured" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Featured Project"
          subtitle="The flagship project combining Full Stack Development and AI"
        />

        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden glass-card border border-white/[0.06]">
            {/* Glow effects */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-glow/10 rounded-full blur-[100px]" />

            <div className="relative p-6 md:p-10 lg:p-12">
              {/* Status badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                  {featuredProject.status}
                </span>
                <span className="text-dark-400 text-sm font-mono">{featuredProject.year}</span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2"
                  onMouseEnter={() => setCursorVariant('text')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {featuredProject.title}
                </h3>
                <p className="text-lg text-dark-600">{featuredProject.subtitle}</p>
              </div>

              {/* App Screenshot Preview Card */}
              <div className="mb-8 rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl group">
                <div className="bg-dark-100/90 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-midnight-bg/60 border border-white/5 text-xs text-dark-400 font-mono truncate max-w-xs sm:max-w-md">
                    https://edutrack-ai-pink.vercel.app
                  </div>
                  <div className="text-xs text-cyan-glow font-mono hidden sm:block">Live App</div>
                </div>
                <a
                  href={featuredProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden"
                >
                  <img
                    src="/edutrack-preview1.png"
                    alt="EduTrack AI Interface"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-bg via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                </a>
              </div>

              <p className="text-dark-500 leading-relaxed max-w-3xl mb-8">{featuredProject.description}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-cloud uppercase tracking-wider mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture placeholder */}
                <div>
                  <h4 className="text-sm font-semibold text-cloud uppercase tracking-wider mb-3">Architecture</h4>
                  <div className="flex items-center gap-2 text-sm text-dark-500">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-xs">
                      <span className="text-primary-400">React</span>
                      <span className="text-dark-400">→</span>
                      <span className="text-green-400">FastAPI</span>
                      <span className="text-dark-400">→</span>
                      <span className="text-yellow-400">SQLite</span>
                      <span className="text-dark-400">→</span>
                      <span className="text-purple-400">ML Models</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-cloud uppercase tracking-wider mb-4">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {featuredProject.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-dark-500"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <FiCheck className="w-4 h-4 text-cyan-glow flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="glow" icon={<FiExternalLink />} href={featuredProject.links.live}>
                  Live Demo
                </Button>
                <Button variant="secondary" icon={<FiGithub />} href={featuredProject.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Button>
                <Button variant="ghost" icon={<FiBookOpen />} href={featuredProject.links.caseStudy}>
                  Case Study
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default FeaturedProject
