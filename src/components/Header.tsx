import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useHandleNavClick } from '@/hooks/useHandleNavClick'
import { navItems } from '@/lib/navItems'

interface HeaderProps {
  onNavigate: (section: string) => void
  activeSection: string
  onAboutClick: () => void
}

export function Header({
  activeSection,
  onNavigate,
  onAboutClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { handleNavClick } = useHandleNavClick({
    onNavigate,
    onAboutClick,
    closeMenu: () => setIsMenuOpen(false),
  })

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-primary-foreground text-sm">
                LM
              </span>
            </div>
            <span className="font-bold text-xl">Lucas Marcondes</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <button
                className={`cursor-pointer font-medium text-muted-foreground text-sm transition-colors hover:text-foreground ${
                  activeSection === item.section
                    ? 'text-primary underline underline-offset-4'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            size="icon"
            variant="ghost"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 border-t pt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  className="py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
