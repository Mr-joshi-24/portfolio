import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import GlassCard from '../components/ui/GlassCard'
import { stats } from '../data/stats'
import useStore from '../store/useStore'
import { useGitHubStats } from '../hooks/useGitHubStats'

const interests = [
  'AI', 'Machine Learning', 'MERN Stack', 'FastAPI', 'Python',
  'Full Stack Development', 'Backend Systems', 'Problem Solving'
]

const About = () => {
  const setCursorVariant = useStore((s) => s.setCursorVariant)
  const { data: ghData } = useGitHubStats()

  // Merge live GitHub contributions into the stats array
  const liveStats = stats.map((s) =>
    s.label === 'GitHub Contributions'
      ? { ...s, value: ghData.contributions }
      : s
  )

  return (
    <section id="about" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="About Me"
          subtitle="A glimpse into who I am and what drives me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Professional Photo with Glass Frame */}
          <ScrollReveal direction="left">
            <div className="relative group max-w-md mx-auto">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-electric via-cyan-glow to-aurora-purple opacity-30 group-hover:opacity-75 blur-xl transition-all duration-500" />

              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card p-2 border border-white/10">
                <div className="w-full h-full rounded-[20px] overflow-hidden relative">
                  <img
                    src="/kavy-joshi.jpg"
                    alt="Kavy Joshi"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-bg/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cloud font-semibold text-sm">Kavy Joshi</p>
                        <p className="text-cyan-glow text-xs font-mono">CSE Graduating 2028</p>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-cloud mb-4">
                  Computer Science Engineering Student
                </h3>
                <p className="text-dark-500 leading-relaxed mb-4">
                  I'm a dedicated Computer Science Engineering student graduating in 2028, passionate about
                  building impactful software that solves real-world problems. My journey spans across
                  Full Stack Development, Artificial Intelligence, and Machine Learning.
                </p>
                <p className="text-dark-500 leading-relaxed">
                  My ambition is to achieve financial independence through technology, while continuously 
                  learning and innovating. I believe in building products that matter and contributing 
                  to the developer community.
                </p>
              </div>

              {/* Interest Tags */}
              <div>
                <h4 className="text-sm font-semibold text-dark-600 uppercase tracking-wider mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-white/5 text-dark-600 hover:text-cyan-glow hover:border-cyan-glow/20 transition-colors duration-300"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ambitions */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🚀', text: 'Building Impactful Software' },
                  { icon: '💡', text: 'Innovation & Creativity' },
                  { icon: '📚', text: 'Continuous Learning' },
                  { icon: '💰', text: 'Financial Independence' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-dark-500">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {liveStats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.05}>
              <GlassCard tilt={false} className="p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-cloud mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-dark-400 text-xs">{stat.label}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
