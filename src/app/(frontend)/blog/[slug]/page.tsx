import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = posts.docs[0]

  return (
    <div className="container my-10">
      <h1>{post.title}</h1>
      <RenderBlocks blocks={post.content} />
    </div>
  )
}
