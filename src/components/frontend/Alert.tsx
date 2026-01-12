import { TriangleAlert } from 'lucide-react'

export function Alert({ className, textPosition }: { className: string; textPosition: string }) {
  const alignClass =
    textPosition == 'right'
      ? 'justify-end'
      : textPosition == 'left'
        ? 'justify-start'
        : 'justify-center'
  return (
    <div className={`container ${className}`}>
      <div role="alert" className={`alert alert-warning flex ${alignClass}`}>
        <TriangleAlert />
        <span>
          Diese Webseite ist ein Lernprojekt. Inhalte, einschließlich Hundeprofile, sind fiktiv und
          dienen ausschließlich Übungszwecken.
        </span>
      </div>
    </div>
  )
}
