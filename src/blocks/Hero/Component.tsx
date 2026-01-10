import type { Hero as HeroProps } from '@/payload-types'
import { HeroStacked } from './HeroStacked'
import { HeroSplit } from './HeroSplit'

type Props = {
  className?: string
} & HeroProps

export const HeroBlock: React.FC<Props> = (props) => {
  const { variant } = props

  // Fallback, bis andere Varianten gebaut sind
  if (variant === 'stacked') {
    return <HeroStacked {...props} />
  } else if (variant === 'split') return <HeroSplit {...props} />

  // Optional: Temporärer Fallback, bis split / imageBackground implementiert sind
  return <HeroStacked {...props} />
}
