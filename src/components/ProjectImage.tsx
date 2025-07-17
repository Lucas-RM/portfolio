import { ImageIcon } from 'lucide-react'
import { Img } from 'react-image'
import { cn } from '@/lib/utils'

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
  loader?: React.ReactNode
}

export function ProjectImage({
  src,
  alt,
  className,
  fallbackIcon,
  loader,
}: ProjectImageProps) {
  return (
    <Img
      alt={alt}
      className={cn(
        'object-cover transition-transform duration-300 group-hover:scale-105',
        className
      )}
      loader={
        loader ?? (
          <div
            className={cn(
              'flex animate-pulse items-center justify-center bg-gray-100',
              className
            )}
          />
        )
      }
      src={src}
      unloader={
        <div
          aria-label={alt}
          className={cn(
            'flex items-center justify-center bg-gray-800 text-gray-500',
            className
          )}
          role="img"
        >
          {fallbackIcon ?? <ImageIcon className="h-6 w-6" />}
        </div>
      }
    />
  )
}
