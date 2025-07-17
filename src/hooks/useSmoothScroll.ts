export function useSmoothScroll() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'about') {
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { scrollToSection }
}
