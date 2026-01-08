import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })

  return pages.docs[0] ?? null
}
