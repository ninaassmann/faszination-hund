import { RichText } from '@/components/frontend/RichText'
import type { Content as ContentProps } from '@/payload-types'

type Props = {
  className?: string
} & ContentProps

export const ContentBlock: React.FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <section className={className}>
      <RichText data={content} className="prose prose-neutral max-w-none" />
    </section>
  )
}
