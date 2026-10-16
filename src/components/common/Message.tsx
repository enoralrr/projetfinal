import type { ReactNode } from 'react'

interface MessageProps {
  variant?: 'info' | 'error' | 'success'
  children: ReactNode
}

export default function Message({ variant = 'info', children }: MessageProps) {
  return (
    <p
      className={`message message-${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {children}
    </p>
  )
}