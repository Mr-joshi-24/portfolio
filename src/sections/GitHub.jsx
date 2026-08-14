import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiUsers, FiGitCommit, FiExternalLink } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { useGitHubStats } from '../hooks/useGitHubStats'

const langColors = {
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#E34F26',
  'Jupyter Notebook': '#DA5B0B',
  TypeScript: '#3178C6',
  CSS: '#563d7c',
}

/** Shimmer placeholder while data loads */
const Skeleton = ({ className = '' }) => (
  <div
    className={`rounded-lg bg-white/5 animate-pulse ${className}`}
    aria-hidden="true"
  />
)

const GitHub = () => {
  const { data: githubStats, loading } = useGitHubStats()

  return (
    <section id="github" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open source contributions and coding activity"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FiGithub />, label: 'Repositories', value: githubStats.repos },
                { icon: <FiGitCommit />, label: 'Contributions', value: githubStats.contributions },
                { icon: <FiStar />, label: 'Stars', value: githubStats.stars },
                { icon: <FiUsers />, label: 'Followers', value: githubStats.followers },
              ].map((stat) => (
                <GlassCard key={stat.label} tilt={false} className="p-4 text-center">
                  <div className="text-primary-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-xl font-bold text-cloud">
                    {loading ? (
                      <Skeleton className="h-6 w-10 mx-auto" />
                    ) : (
                      <AnimatedCounter value={stat.value} />
                    )}
                  </div>
                  <p className="text-dark-400 text-xs mt-1">{stat.label}</p>
                </GlassCard>
              ))}
            </div>

            {/* Profile link */}
            <a
              href={githubStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl glass border border-white/10 text-sm text-dark-500 hover:text-cloud hover:border-primary-500/30 transition-all duration-300"
            >
              <FiGithub className="w-4 h-4" />
              View GitHub Profile
              <FiExternalLink className="w-3 h-3" />
            </a>
          </ScrollReveal>

          {/* Languages */}
          <ScrollReveal delay={0.1}>
            <GlassCard tilt={false} className="p-6 h-full">
              <h3 className="text-sm font-semibold text-cloud uppercase tracking-wider mb-4">Top Languages</h3>
              <div className="space-y-3">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))
                  : githubStats.languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-dark-600 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: lang.color }} />
                            {lang.name}
                          </span>
                          <span className="text-dark-400">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: lang.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
              </div>

              {/* Contribution heatmap */}
              <div className="mt-6">
                <h4 className="text-xs text-dark-500 mb-2">Contribution Activity</h4>
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const intensity = Math.random()
                    return (
                      <motion.div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          backgroundColor: intensity > 0.7
                            ? 'rgba(59, 130, 246, 0.6)'
                            : intensity > 0.4
                              ? 'rgba(59, 130, 246, 0.3)'
                              : intensity > 0.2
                                ? 'rgba(59, 130, 246, 0.15)'
                                : 'rgba(255,255,255,0.03)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.01 }}
                      />
                    )
                  })}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Repos */}
          <ScrollReveal delay={0.2}>
            <GlassCard tilt={false} className="p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-cloud uppercase tracking-wider">Repositories</h3>
                {!loading && (
                  <span className="text-xs text-primary-400 font-mono">{githubStats.repos} total</span>
                )}
              </div>
              <div className="space-y-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-2 w-1/3" />
                      </div>
                    ))
                  : githubStats.pinnedRepos.map((repo) => (
                      <motion.a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/20 transition-colors cursor-pointer"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <FiGithub className="w-3 h-3 text-dark-500" />
                          <span className="text-sm font-medium text-primary-400">{repo.name}</span>
                        </div>
                        <p className="text-dark-400 text-xs mb-2 line-clamp-2">{repo.description}</p>
                        <div className="flex items-center gap-3 text-[10px] text-dark-400">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: langColors[repo.language] || '#71717A' }}
                            />
                            {repo.language}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiStar className="w-2.5 h-2.5" /> {repo.stars}
                          </span>
                        </div>
                      </motion.a>
                    ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default GitHub
