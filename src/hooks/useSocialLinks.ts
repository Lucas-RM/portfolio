import { Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ErrorMessageProps } from '@/types/errorMessageProps'
import type { IconComponent, SocialLinksProps } from '@/types/socialLinksProps'

const iconMap: Record<string, IconComponent> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps[]>([])
  const [error, setError] = useState<ErrorMessageProps | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const socialLinksResponse = await fetch('./src/data/socialLinks.json')

        if (!socialLinksResponse.ok) {
          throw new Error('Erro ao carregar os contatos.')
        }

        const data = await socialLinksResponse.json()
        const withIcons: SocialLinksProps[] = data.map(
          (item: Omit<SocialLinksProps, 'icon'>) => ({
            ...item,
            icon: iconMap[item.lucideIcon.toLowerCase()],
          })
        )

        setSocialLinks(withIcons)
      } catch {
        setError({
          message: 'Erro ao carregar os links de contatos.',
          className: 'px-4 py-2',
        })
      }
    }

    loadData()
  }, [])

  return { socialLinks, error }
}
