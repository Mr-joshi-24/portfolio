import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'

// Blog posts — set to empty array, section auto-hides
const blogPosts = []

const Blog = () => {
  if (blogPosts.length === 0) return null

  return (
    <section id="blog" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Blog & Articles"
          subtitle="Thoughts, tutorials, and learning notes"
        />
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="glass-card p-6">
                <span className="text-xs text-dark-400 font-mono">{post.date}</span>
                <h3 className="text-lg font-semibold text-cloud mt-2 mb-2">{post.title}</h3>
                <p className="text-dark-500 text-sm">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Blog
