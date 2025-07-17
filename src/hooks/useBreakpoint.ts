import { useEffect, useState } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'
const ScreenSize = {
  mobile: 864,
  tablet: 1152,
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < ScreenSize.mobile) {
        return 'mobile'
      }
      if (width < ScreenSize.tablet) {
        return 'tablet'
      }
    }
    return 'desktop'
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < ScreenSize.mobile) {
        setBreakpoint('mobile')
      } else if (width < ScreenSize.tablet) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  }
}
