import { RichText } from '@/components/frontend/RichText'
import type { Content as ContentProps } from '@/payload-types'

type Props = {
  className?: string
} & ContentProps

export const ContentBlock: React.FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <div className={`my-28 ${className}`}>
      <RichText data={content} className="prose prose-neutral max-w-none" />
    </div>
  )
}
