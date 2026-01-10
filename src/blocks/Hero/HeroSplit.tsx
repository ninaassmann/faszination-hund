import type { Hero as HeroProps } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { getSectionClass } from '@/utils/getSectionClass'

type Props = {
  className?: string
} & HeroProps

export const HeroSplit: React.FC<Props> = ({
  eyebrow,
  headline,
  text,
  ctas,
  image,
  backgroundColor,
  textPosition,
  className,
}) => {
  if (!text) return null

  const mediaImage = typeof image === 'object' && image !== null ? image : undefined
  const alignClass =
    textPosition === 'left'
      ? 'text-left'
      : textPosition === 'right'
        ? 'text-right'
        : textPosition === 'center'
          ? 'text-center'
          : 'text-left'
  const backgroundClass = getSectionClass(backgroundColor)

  return (
    <section className={`py-28 ${backgroundClass} ${className ?? ''}`}>
      <div className={`container flex justify-between items-center ${alignClass}`}>
        <div className="w-1/2">
          <span className="uppercase tracking-widest text-sm mb-2">{eyebrow}</span>
          <h1>{headline}</h1>
          <p className="max-w-4/5">{text}</p>
          {Array.isArray(ctas) && ctas.length > 0 && (
            <div className="flex gap-4">
              {ctas.map((button, index) => {
                let href: string = '#'

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
                    className={`btn btn-${button.style || 'primary'}`}
                  >
                    {button.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        {mediaImage?.url && (
          <div className="rounded-2xl aspect-[2/3] overflow-clip relative w-1/3">
            <Image
              src={mediaImage?.url}
              alt={mediaImage?.alt}
              width={mediaImage?.width || 1000}
              height={mediaImage?.height || 300}
              className="w-full h-full object-cover"
            />
            {mediaImage?.source && (
              <Link
                href={mediaImage.source}
                target="_blank"
                rel="noopener noreferrer"
                className="badge absolute bottom-2 right-2 z-10"
              >
                Adobe Stock
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
