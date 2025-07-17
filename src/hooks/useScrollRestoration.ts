import { useEffect } from 'react'

export function useScrollRestoration() {
  useEffect(() => {
    const navEntries = performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[]
    const isReload = navEntries?.[0]?.type === 'reload'

    if (!isReload) {
      // Se não for reload, limpa o localStorage para começar do topo
      localStorage.removeItem('lastSection')
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const handleLoad = () => {
      requestAnimationFrame(() => {
        const lastSection = localStorage.getItem('lastSection')

        if (lastSection && lastSection !== 'about') {
          // Pequeno delay para garantir que o DOM esteja pronto
          setTimeout(() => {
            const element = document.getElementById(lastSection)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })

              localStorage.removeItem('lastSection')
            }
          }, 700)
        }
      })
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])
}
