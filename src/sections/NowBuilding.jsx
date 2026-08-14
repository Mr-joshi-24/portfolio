import { motion } from 'framer-motion'
import { FiCpu, FiCode } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const learningSkills = [
  {
    name: 'AI & NLP',
    category: 'AI / ML',
    level: 75,
    angle: 0,
    color: '#a855f7',
    icon: '🤖',
    desc: 'Resume parsing & NLP matching',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    level: 82,
    angle: 60,
    color: '#10b981',
    icon: '⚡',
    desc: 'Async REST APIs & Services',
  },
  {
    name: 'React',
    category: 'Frontend',
    level: 90,
    angle: 120,
    color: '#06b6d4',
    icon: '⚛️',
    desc: 'Modern UI & State Management',
  },
  {
    name: 'Python',
    category: 'Language',
    level: 88,
    angle: 180,
    color: '#3b82f6',
    icon: '🐍',
    desc: 'Data science & ML pipelines',
  },
  {
    name: 'DSA',
    category: 'Core CS',
    level: 72,
    angle: 240,
    color: '#f59e0b',
    icon: '🧠',
    desc: 'Data Structures & Algorithms',
  },
  {
    name: 'SQLite & SQL',
    category: 'Database',
    level: 80,
    angle: 300,
    color: '#ec4899',
    icon: '🗄️',
    desc: 'Database Design & Queries',
  },
]

const projectProgress = [
  { label: 'Frontend (React & UI/UX)', progress: 70 },
  { label: 'Backend (FastAPI APIs)', progress: 65 },
  { label: 'AI Resume Parser & NLP Engine', progress: 50 },
  { label: 'Job Recommendation Model', progress: 40 },
]

const NowBuilding = () => {
  // Compute polygon points for SVG skill web graph
  const polygonPoints = learningSkills
    .map((tech) => {
      const radian = (tech.angle * Math.PI) / 180
      const radius = (tech.level / 100) * 110 // max radius 110 inside 300x300 viewBox
      const x = 150 + radius * Math.cos(radian)
      const y = 150 + radius * Math.sin(radian)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <section id="now-building" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Now Building & Learning"
          subtitle="My active development project and continuous learning focus"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Active Project */}
          <ScrollReveal direction="left">
            <GlassCard tilt={false} className="p-8 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-glow/10 rounded-full blur-[70px]" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse shadow-[0_0_8px_#00f0ff]" />
                    <span className="text-xs font-mono text-cyan-glow uppercase tracking-wider font-semibold">
                      Currently Active Project
                    </span>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    2025 Flagship
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gradient mb-3">Job Scout AI</h3>
                <p className="text-dark-500 text-sm leading-relaxed mb-6">
                  Building an intelligent AI-driven job searching and career scouting platform. It parses resumes with NLP, detects skill gaps, and matches job seekers with relevant tech opportunities using machine learning recommendations.
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React', 'FastAPI', 'Python', 'NLP', 'Scikit-Learn', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 text-cloud border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3.5 mb-6">
                  {projectProgress.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5 font-medium">
                        <span className="text-cloud">{item.label}</span>
                        <span className="text-cyan-glow font-mono">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-dark-200/80 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-cyan-glow to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-dark-400">
                <span className="flex items-center gap-1.5">
                  <FiCpu className="text-cyan-glow" /> Status: Active Development Phase
                </span>
                <span className="font-mono text-cyan-glow">Phase 1 in Progress</span>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Improved Learning Focus & Radar Constellation */}
          <ScrollReveal direction="right">
            <GlassCard tilt={false} className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-cloud uppercase tracking-wider flex items-center gap-2">
                    <FiCode className="text-cyan-glow" /> Learning Focus Radar
                  </h3>
                  <span className="text-xs text-dark-400 font-mono">Skill Matrix 2025</span>
                </div>

                {/* Interactive Skill Graph Radar */}
                <div className="relative w-full aspect-square max-w-[320px] mx-auto my-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
                    {/* Concentric Grid Circles */}
                    {[110, 82.5, 55, 27.5].map((r) => (
                      <circle
                        key={r}
                        cx="150"
                        cy="150"
                        r={r}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeDasharray={r === 110 ? 'none' : '3 3'}
                        strokeWidth="1"
                      />
                    ))}

                    {/* Radial Axis Lines */}
                    {learningSkills.map((tech) => {
                      const radian = (tech.angle * Math.PI) / 180
                      const x2 = 150 + 110 * Math.cos(radian)
                      const y2 = 150 + 110 * Math.sin(radian)
                      return (
                        <line
                          key={tech.name}
                          x1="150"
                          y1="150"
                          x2={x2}
                          y2={y2}
                          stroke="rgba(255, 255, 255, 0.06)"
                          strokeWidth="1"
                        />
                      )
                    })}

                    {/* Web Skill Connections Polygon */}
                    <polygon
                      points={polygonPoints}
                      fill="rgba(0, 240, 255, 0.15)"
                      stroke="#00f0ff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />

                    {/* Center Core */}
                    <circle cx="150" cy="150" r="5" fill="#00f0ff" className="animate-pulse" />
                    <circle cx="150" cy="150" r="10" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />
                  </svg>

                  {/* Skill Floating Badges */}
                  {learningSkills.map((tech) => {
                    const radian = (tech.angle * Math.PI) / 180
                    const radius = (tech.level / 100) * 110
                    const xPercent = ((150 + radius * Math.cos(radian)) / 300) * 100
                    const yPercent = ((150 + radius * Math.sin(radian)) / 300) * 100

                    return (
                      <motion.div
                        key={tech.name}
                        className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border shadow-lg cursor-pointer group"
                        style={{
                          left: `${xPercent}%`,
                          top: `${yPercent}%`,
                          transform: 'translate(-50%, -50%)',
                          borderColor: `${tech.color}50`,
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.15, zIndex: 20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="text-xs">{tech.icon}</span>
                        <span className="text-xs font-semibold text-cloud whitespace-nowrap">{tech.name}</span>
                        <span
                          className="text-[10px] font-mono font-bold px-1 rounded"
                          style={{ color: tech.color, backgroundColor: `${tech.color}20` }}
                        >
                          {tech.level}%
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Skill Highlights List */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {learningSkills.slice(0, 4).map((tech) => (
                    <div
                      key={tech.name}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                        style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-cloud truncate">{tech.name}</div>
                        <div className="text-[10px] text-dark-400 truncate">{tech.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default NowBuilding
