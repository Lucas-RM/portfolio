import type { LucideProps } from 'lucide-react'

export type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

export interface SocialLinksProps {
  name: string
  href: string
  color: string
  lucideIcon: string
  icon: IconComponent
}
