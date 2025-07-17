import { ImageIcon } from 'lucide-react'
import { Img } from 'react-image'
import { cn } from '@/lib/utils'

interface AvatarImageProps {
  src: string
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
  loader?: React.ReactNode
}

export function AvatarImage({
  src,
  alt,
  className,
  fallbackIcon,
  loader,
}: AvatarImageProps) {
  return (
    <Img
      alt={alt}
      className={cn('h-full w-full rounded-full object-cover', className)}
      loader={
        loader ?? (
          <div
            className={cn(
              'flex animate-pulse items-center justify-center rounded-full bg-gray-100',
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
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-500',
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
