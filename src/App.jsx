import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import FeaturedProject from './sections/FeaturedProject'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Services from './sections/Services'
import Achievements from './sections/Achievements'
import GitHub from './sections/GitHub'
import LeetCode from './sections/LeetCode'
import NowBuilding from './sections/NowBuilding'
import Blog from './sections/Blog'
import Contact from './sections/Contact'
import useStore from './store/useStore'
import { createKonamiDetector } from './utils/helpers'

function App() {
  const setActiveSection = useStore((s) => s.setActiveSection)

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sectionIds = [
      'home', 'about', 'skills', 'featured', 'projects',
      'education', 'experience', 'services', 'achievements',
      'github', 'leetcode', 'now-building', 'contact'
    ]

    const observers = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [setActiveSection])

  // Konami code easter egg
  useEffect(() => {
    const cleanup = createKonamiDetector(() => {
      document.body.style.transition = 'filter 0.5s'
      document.body.style.filter = 'hue-rotate(180deg)'
      setTimeout(() => {
        document.body.style.filter = ''
      }, 3000)
    })
    return cleanup
  }, [])

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <Projects />
      <NowBuilding />
      <Education />
      <Experience />
      <Services />
      <Achievements />
      <GitHub />
      <LeetCode />
      <Blog />
      <Contact />
    </Layout>
  )
}

export default App
