import type { Hero as HeroProps } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { getSectionClass } from '@/utils/getSectionClass'
import { HeroCtas } from './HeroCtas'
import { Alert } from '@/components/frontend/Alert'

type Props = {
  className?: string
} & HeroProps

export const HeroStacked: React.FC<Props> = ({
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
      ? 'text-left items-start'
      : textPosition === 'right'
        ? 'text-right items-end'
        : textPosition === 'center'
          ? 'text-center items-center'
          : 'text-left items-start'
  const backgroundClass = getSectionClass(backgroundColor)
  const hasCtas = Array.isArray(ctas) && ctas.length > 0

  return (
    <section className={`py-28 ${backgroundClass} ${className ?? ''}`}>
      <div className={`container flex flex-col ${alignClass}`}>
        <span className="uppercase tracking-widest text-sm mb-2 ml-1">{eyebrow}</span>
        <h1>{headline}</h1>
        <p className="sm:max-w-[80%] ml-1">{text}</p>
        <HeroCtas ctas={ctas} />
        {mediaImage?.url && (
          <div
            className={`rounded-2xl aspect-[10/3] overflow-clip relative w-full ${hasCtas ? 'mt-10' : 'mt-4'}`}
          >
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
      <Alert className="mt-6" textPosition={textPosition as string} />
    </section>
  )
}
