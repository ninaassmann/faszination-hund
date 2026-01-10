import { Hero as HeroProps } from '@/payload-types'
import Link from 'next/link'

export const HeroCtas: React.FC<{ ctas?: HeroProps['ctas'] }> = ({ ctas }) => {
  if (!Array.isArray(ctas) || ctas.length === 0) return null

  return (
    <div className="flex gap-4">
      {ctas.map((button, index) => {
        let href = '#'
        if (button.type === 'intern') {
          if (button.intern && typeof button.intern === 'object') {
            href = button.intern.slug ?? '#'
          }
        } else if (button.type === 'extern') {
          href = button.extern ?? '#'
        }

        return (
          <Link
            key={index}
            href={href}
            target={button.type === 'extern' ? '_blank' : undefined}
            rel={button.type === 'extern' ? 'noopener noreferrer' : undefined}
            className={`btn ${button.style || 'primary'}`}
          >
            {button.label}
          </Link>
        )
      })}
    </div>
  )
}
