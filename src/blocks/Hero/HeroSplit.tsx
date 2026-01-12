import type { Hero as HeroProps } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { getSectionClass } from '@/utils/getSectionClass'
import { HeroCtas } from './HeroCtas'
import { Alert } from '@/components/frontend/Alert'

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
  const backgroundClass = getSectionClass(backgroundColor)
  const hasCtas = Array.isArray(ctas) && ctas.length > 0

  return (
    <section className={`py-28 ${backgroundClass} ${className ?? ''}`}>
      <div className="container flex flex-wrap justify-between items-center">
        {/* Textposition Left */}
        {textPosition == 'left' && (
          <div className="w-full sm:w-2/3 lg:w-1/2 ml-1 md:ml-0">
            <span className="uppercase tracking-widest text-sm mb-2">{eyebrow}</span>
            <h1>{headline}</h1>
            <p className="max-w-[80%]">{text}</p>
            <HeroCtas ctas={ctas} />
          </div>
        )}

        {/* Image */}
        {mediaImage?.url && (
          <div
            className={`rounded-2xl aspect-[3/2] sm:aspect-[2/3] overflow-clip relative w-full sm:w-1/3 ${hasCtas ? 'mt-10 sm:mt-0' : 'mt-4 sm:mt-0'}`}
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

        {/* Textposition Right */}
        {textPosition == 'right' && (
          <div className="w-full sm:w-2/3 lg:w-1/2 mt-6 sm:mt-0 ml-1 md:ml-0">
            <span className="uppercase tracking-widest text-sm mb-2">{eyebrow}</span>
            <h1>{headline}</h1>
            <p className="max-w-[80%]">{text}</p>
            <HeroCtas ctas={ctas} />
          </div>
        )}
      </div>
      <Alert className="mt-6" textPosition="left" />
    </section>
  )
}
