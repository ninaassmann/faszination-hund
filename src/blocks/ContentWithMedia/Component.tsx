import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import { getSectionClass } from '@/utils/getSectionClass'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMediaBlock: React.FC<Props> = (props) => {
  const { headline, headlineLevel, text, image, backgroundColor, textPosition, className } = props
  const { media } = image
  const Tag = (headlineLevel === 'h3' ? 'h3' : 'h2') as 'h2' | 'h3'

  const mediaImage = typeof media === 'object' && media !== null ? media : undefined
  const backgroundClass = getSectionClass(backgroundColor)

  return (
    <section className={`py-28 ${backgroundClass} ${className ?? ''}`}>
      <div className={`container flex justify-between items-center`}>
        {textPosition === 'left' && (
          <div className="w-1/2">
            <Tag>{headline}</Tag>
            <p className="max-w-[80%]">{text}</p>
          </div>
        )}
        {mediaImage?.url && (
          <div className="rounded-2xl aspect-[4/3] overflow-clip relative w-1/3">
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

        {textPosition === 'right' && (
          <div className="w-1/2">
            <Tag>{headline}</Tag>
            <p className="max-w-[80%]">{text}</p>
          </div>
        )}
      </div>
    </section>
  )
}
