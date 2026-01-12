import type { Hero as HeroProps } from '@/payload-types'
import { getSectionClass } from '@/utils/getSectionClass'
import { HeroCtas } from './HeroCtas'
import { Alert } from '@/components/frontend/Alert'

type Props = {
  className?: string
} & HeroProps

export const HeroBackground: React.FC<Props> = ({
  eyebrow,
  headline,
  text,
  ctas,
  image,
  backgroundColor,
  textPosition,
  className,
}) => {
  const mediaImage = typeof image === 'object' && image !== null ? image : undefined
  const alignClass =
    textPosition === 'left'
      ? 'text-left items-start justify-start'
      : textPosition === 'right'
        ? 'text-right items-end justify-end'
        : textPosition === 'center'
          ? 'text-center items-center justify-center'
          : 'text-left'
  const overlayClass =
    backgroundColor === 'var(--frontend-primary)'
      ? 'bg-primary/75'
      : backgroundColor === 'var(--frontend-secondary)'
        ? 'bg-secondary/75'
        : backgroundColor === 'var(--frontend-base-200)'
          ? 'bg-base-200/75'
          : backgroundColor === 'var(--frontend-neutral)'
            ? 'bg-neutral/75'
            : 'bg-white/75'
  const backgroundClass = getSectionClass(backgroundColor)

  return (
    <section
      className={`relative pt-28 pb-36 ${backgroundClass} ${className ?? ''}`}
      style={
        mediaImage?.url
          ? {
              backgroundImage: `url(${mediaImage.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay */}
      {mediaImage?.url && <div className={`absolute inset-0 ${overlayClass}`} aria-hidden="true" />}
      <div className={`relative container flex flex-col z-10 ${alignClass}`}>
        <span className="uppercase tracking-widest text-sm mb-2">{eyebrow}</span>
        <h1>{headline}</h1>
        <p className="max-w-[60%]">{text}</p>
        <HeroCtas ctas={ctas} />
      </div>
      <Alert className="absolute z-10 bottom-6" textPosition={textPosition as string} />
    </section>
  )
}
