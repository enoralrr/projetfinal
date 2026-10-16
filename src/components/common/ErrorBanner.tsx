interface ErrorBannerProps {
  message: string | null
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  if (message === null) return null
  return (
    <div role="alert" className="error-banner">
      {message}
    </div>
  )
}