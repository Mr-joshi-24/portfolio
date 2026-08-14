import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { useLeetCodeStats } from '../hooks/useLeetCodeStats'

/** Shimmer placeholder while data loads */
const Skeleton = ({ className = '' }) => (
  <div className={`rounded-lg bg-white/5 animate-pulse ${className}`} aria-hidden="true" />
)

const DifficultyBar = ({ label, solved, total, color, loading }) => {
  const percentage = total > 0 ? Math.min((solved / total) * 100, 100) : 0

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium w-14 shrink-0" style={{ color }}>{label}</span>
      <div className="flex-1 h-2 bg-dark-200 rounded-full overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-white/5 animate-pulse rounded-full" />
        ) : (
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </div>
      <span className="text-xs text-dark-400 w-8 text-right">
        {loading ? '—' : solved}
      </span>
    </div>
  )
}

const LeetCode = () => {
  const { data: leetcodeStats, loading } = useLeetCodeStats()

  return (
    <section id="leetcode" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="LeetCode Progress"
          subtitle="Tracking my problem-solving journey"
        />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <GlassCard tilt={false} className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* Total Solved */}
                <div className="text-center sm:text-left">
                  <p className="text-dark-500 text-sm mb-1">Total Problems Solved</p>
                  <div className="text-6xl font-bold text-gradient mb-2">
                    {loading ? (
                      <Skeleton className="h-16 w-24 mx-auto sm:mx-0" />
                    ) : (
                      <AnimatedCounter value={leetcodeStats.totalSolved} />
                    )}
                  </div>
                  <p className="text-dark-400 text-xs mb-6">
                    {loading ? <Skeleton className="h-3 w-32 inline-block" /> : leetcodeStats.ranking}
                  </p>

                  {/* Difficulty Bars */}
                  <div className="space-y-3">
                    <DifficultyBar label="Easy" solved={leetcodeStats.easy} total={900} color="#10B981" loading={loading} />
                    <DifficultyBar label="Medium" solved={leetcodeStats.medium} total={1900} color="#F59E0B" loading={loading} />
                    <DifficultyBar label="Hard" solved={leetcodeStats.hard} total={800} color="#EF4444" loading={loading} />
                  </div>
                </div>

                {/* Right: Motivation / CTA */}
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <div className="w-28 h-28 rounded-full glass border border-white/10 flex flex-col items-center justify-center">
                    <span className="text-3xl">🧩</span>
                    <span className="text-xs text-dark-500 mt-1">
                      {loading ? '...' : leetcodeStats.totalSolved > 50 ? 'Keep Going!' : 'Just Started'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-dark-500 text-xs leading-relaxed">
                      Every expert was once a beginner.<br />
                      The journey has just begun.
                    </p>
                  </div>

                  <a
                    href={leetcodeStats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-yellow-500/20 text-sm text-yellow-400 hover:border-yellow-500/40 hover:text-yellow-300 transition-all duration-300"
                  >
                    <span>🏆</span>
                    View LeetCode Profile
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default LeetCode
