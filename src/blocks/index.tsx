import type { Post, Page } from '@/payload-types'

import { ContentBlock } from './Content/Component'
import { HeroCenteredBlock } from './HeroCentered/Component'

const blockComponents = {
  content: ContentBlock,
  heroCentered: HeroCenteredBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Post['content'] | Page['content']
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return (
              <div key={index}>
                {/* @ts-expect-error Payload Blocks haben unterschiedliche Props */}
                <Block {...block} />
              </div>
            )
          }
        }

        return null
      })}
    </>
  )
}
