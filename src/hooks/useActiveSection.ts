import { useEffect, useState } from 'react'
import { navItems } from '@/lib/navItems'
import type { NavItemProps } from '@/types/navItemProps'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = navItems.map((item: NavItemProps) => item.section)

    const getMostVisibleSection = () => {
      let mostVisibleId = ''
      let maxVisibleArea = 0

      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) {
          continue
        }

        const rect = el.getBoundingClientRect()
        const visibleTop = Math.max(rect.top, 0)
        const visibleBottom = Math.min(rect.bottom, window.innerHeight)
        const visibleHeight = visibleBottom - visibleTop

        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight
          mostVisibleId = id
        }
      }

      return mostVisibleId
    }

    const handleScroll = () => {
      const current = getMostVisibleSection()
      if (current && current !== activeSection) {
        setActiveSection(current)

        // Salva a seção no localStorage (exceto "about")
        if (current !== 'about') {
          localStorage.setItem('lastSection', current)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection])

  return activeSection
}
