import type { HeroCentered as HeroCenteredProps } from '@/payload-types'
import { RichText } from '@/components/frontend/RichText'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  className?: string
} & HeroCenteredProps

export const HeroCenteredBlock: React.FC<Props> = ({ content, cta, image, className }) => {
  if (!content) return null

  const mediaImage = typeof image === 'object' && image !== null ? image : undefined

  return (
    <section className={`my-28 ${className}`}>
      <div className="container flex flex-col items-center">
        <RichText
          data={content}
          className="prose prose-neutral max-w-4/5 text-pretty text-center"
        />

        {Array.isArray(cta) && cta.length > 0 && (
          <div className="flex gap-4">
            {cta.map((button, index) => {
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
        {mediaImage?.url && (
          <div className="rounded-2xl aspect-[10/3] overflow-clip relative mt-10">
            <Image
              src={mediaImage?.url}
              alt={mediaImage?.alt}
              width={mediaImage?.width || 1000}
              height={mediaImage?.height || 283}
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
