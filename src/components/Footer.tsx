import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useHandleNavClick } from '@/hooks/useHandleNavClick'
import { useSocialLinks } from '@/hooks/useSocialLinks'
import { navItems } from '@/lib/navItems'
import type { NavItemProps } from '@/types/navItemProps'
import type { SocialLinksProps } from '@/types/socialLinksProps'
import { ErrorMessage } from './ui/errorMessage'

interface FooterProps {
  onNavigate: (section: string) => void
  onAboutClick: () => void
}

export function Footer({ onNavigate, onAboutClick }: FooterProps) {
  const { socialLinks, error } = useSocialLinks()
  const [quickLinks] = useState<NavItemProps[]>(
    navItems.filter((_, index) => index !== 5)
  )
  const { handleNavClick } = useHandleNavClick({
    onNavigate,
    onAboutClick,
  })

  return (
    <footer className="border-t bg-background" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-bold text-primary-foreground text-sm">
                  LM
                </span>
              </div>
              <span className="font-bold text-xl">Lucas Marcondes</span>
            </div>
            <p className="max-w-md text-muted-foreground">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras
              e experiências digitais excepcionais.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Rápidos</h3>
            <div className="flex flex-col space-y-2">
              {quickLinks.map((item) => (
                <button
                  className={
                    'cursor-pointer text-left text-muted-foreground transition-colors hover:text-foreground'
                  }
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contatos</h3>
            <div className="flex space-x-2">
              {error && (
                <ErrorMessage
                  className={error.className}
                  message={error.message}
                />
              )}
              {socialLinks?.map((link: SocialLinksProps) => (
                <Button
                  asChild
                  className={`transition-colors ${link.color}`}
                  key={link.name}
                  size="icon"
                  variant="outline"
                >
                  {link.icon && (
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Lucas Marcondes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
