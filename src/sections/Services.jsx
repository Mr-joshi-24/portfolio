import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import { services } from '../data/services'

const Services = () => {
  return (
    <section id="services" className="section-padding relative">
      <div className="section-max">
        <SectionHeading
          title="Services"
          subtitle="What I can build for you — even as a student, I deliver professional results"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <GlassCard className="p-6 h-full flex flex-col">
                <span className="text-3xl mb-4">{service.icon}</span>
                <h3 className="text-lg font-semibold text-cloud mb-2">{service.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 text-dark-500 border border-white/5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
