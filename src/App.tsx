import { useEffect, useState } from 'react'
import { AboutModal } from '@/components/AboutModal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Resume } from '@/components/Resume'
import { Skills } from '@/components/Skills'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollRestoration } from './hooks/useScrollRestoration'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const [showModal, setShowModal] = useState(false)

  useScrollRestoration()

  // Garante que tudo (inclusive imagens) foi carregado
  useEffect(() => {
    const handleLoad = () => {
      requestAnimationFrame(() => {
        setIsLoaded(true)
      })
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  // Ativa a detecção da seção visível (e salva no localStorage)
  const activeSection = useActiveSection()

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="font-semibold text-3xl text-muted-foreground">
          Carregando portfólio...
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        onAboutClick={() => setShowModal(true)}
        onNavigate={scrollToSection}
      />

      <main>
        {/* Hero Section */}
        <section className="pb-20" id="home">
          <Hero />
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Resume Section */}
        <Resume />

        {/* Footer */}
        <Footer
          onAboutClick={() => setShowModal(true)}
          onNavigate={scrollToSection}
        />
      </main>

      {/* About Modal - Triggered from Header */}
      {showModal && <AboutModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
