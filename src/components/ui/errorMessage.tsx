import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ErrorMessageProps } from '@/types/errorMessageProps'

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2 md:gap-3',
        'w-full md:w-auto',
        'rounded bg-accent p-2 text-center text-base text-red-500',
        className
      )}
    >
      <AlertCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  )
}
