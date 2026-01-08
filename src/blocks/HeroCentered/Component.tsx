import type { HeroCentered as HeroCenteredProps } from '@/payload-types'

import { RichText } from '@/components/frontend/RichText'

type Props = {
  className?: string
} & HeroCenteredProps

export const HeroCenteredBlock: React.FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <div className={`my-28 ${className}`}>
      <RichText data={content} className="prose prose-neutral max-w-none" />
    </div>
  )
}
