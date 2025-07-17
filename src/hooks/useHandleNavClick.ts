interface UseHandleNavClickProps {
  onNavigate: (section: string) => void
  onAboutClick: () => void
  closeMenu?: () => void
}

export function useHandleNavClick({
  onNavigate,
  onAboutClick,
  closeMenu,
}: UseHandleNavClickProps) {
  const handleNavClick = (section: string) => {
    if (section === 'about') {
      onAboutClick()
    } else {
      onNavigate(section)
    }

    if (closeMenu) {
      closeMenu()
    }
  }

  return { handleNavClick }
}
