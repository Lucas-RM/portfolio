import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSocialLinks } from '@/hooks/useSocialLinks'
import { AvatarImage } from './ui/avatarImage'
import { ErrorMessage } from './ui/errorMessage'

export function Hero() {
  const [text, setText] = useState('')
  const fullText = 'Lucas Marcondes'
  const [currentIndex, setCurrentIndex] = useState(0)
  const { socialLinks, error } = useSocialLinks()

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 120)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  return (
    <section className="flex min-h-screen items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-bold text-4xl md:text-6xl">
                Olá, eu sou{' '}
                <span className="text-primary">
                  {text}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl">
                Desenvolvedor Full Stack
              </p>
              <p className="max-w-2xl text-muted-foreground text-sm*2 md:text-lg">
                Apaixonado por criar soluções inovadoras e resolver problemas
                com código. Transformo ideias em soluções robustas com C#,
                Angular, React, TypeScript e SQL Server.
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-4">
              {error && (
                <ErrorMessage
                  className={error.className}
                  message={error.message}
                />
              )}
              {socialLinks?.map((link) => (
                <Button
                  asChild
                  className={`transition-colors ${link.color}`}
                  key={link.name}
                  size="lg"
                  variant="outline"
                >
                  {link.icon && (
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <link.icon className="mr-2 h-5 w-5" />
                      {link.name}
                    </a>
                  )}
                </Button>
              ))}
            </div>

            {/* Download CV Button */}
            <a download href="/curriculo/CV - Lucas Rodrigues Marcondes.pdf">
              <Button
                className="cursor-pointer bg-primary hover:bg-primary/100"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar Currículo (PDF)
              </Button>
            </a>
          </div>

          {/* Right Side - Profile Image */}
          <div className="hidden justify-center lg:flex lg:justify-end">
            <div className="relative">
              <div className="flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50">
                <div className="flex h-76 w-76 items-center justify-center rounded-full bg-background">
                  <div className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/50 font-bold text-6xl text-muted-foreground">
                    <AvatarImage
                      alt="Foto de perfil de Lucas Marcondes"
                      src="https://res.cloudinary.com/lucasmarcondes/image/upload/v1752871898/portfolio-projects/lucas-rm.webp"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="-top-4 -right-4 absolute h-8 w-8 animate-bounce rounded-full bg-accent" />
              <div className="-bottom-4 -left-4 absolute h-6 w-6 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
