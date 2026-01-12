import { RichText } from '@/components/frontend/RichText'
import type { Content as ContentProps } from '@/payload-types'

type Props = {
  className?: string
} & ContentProps

export const ContentBlock: React.FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className="container">
        <RichText data={content} className="prose prose-neutral sm:max-w-[80%]" />
      </div>
    </section>
  )
}
