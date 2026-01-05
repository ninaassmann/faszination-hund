import { Post } from '@/payload-types'
import { ContentBlock } from './Content/Component'

const blockComponents = {
  content: ContentBlock,
}

export const RenderBlocks: React.FC<{ blocks: Post['content'] }> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} />
                </div>
              )
            }
            return null
          }
        })}
      </>
    )
  }
  return null
}
