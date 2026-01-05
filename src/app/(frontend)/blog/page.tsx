import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
  })

  return (
    <section className="container grid grid-cols-3 my-10">
      {posts.docs.map((post) => (
        <div key={post.id} className="card card-border bg-base-100">
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <div className="card-actions justify-end">
              <Link href={`/blog/${post.slug}`} className="btn btn-primary">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
