import type { Hero as HeroProps } from '@/payload-types'
import { HeroStacked } from './HeroStacked'
import { HeroSplit } from './HeroSplit'
import { HeroBackground } from './HeroBackground'

type Props = {
  className?: string
} & HeroProps

export const HeroBlock: React.FC<Props> = (props) => {
  const { variant } = props

  if (variant === 'stacked') {
    return <HeroStacked {...props} />
  } else if (variant === 'split') return <HeroSplit {...props} />
  else if (variant === 'imageBackground') return <HeroBackground {...props} />
}
