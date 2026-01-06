import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BreedHero } from './components/BreedHero'
import { Media } from '@/payload-types'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const dogbreeds = await payload.find({
    collection: 'dogbreeds',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const breed = dogbreeds.docs[0]
  const heroImage = breed.images?.find(
    (img): img is { media: Media; type: 'gallery' } =>
      img.type === 'gallery' && typeof img.media !== 'number',
  )
  const thumbnail = breed.images?.find(
    (img): img is { media: Media; type: 'thumbnail' } =>
      img.type === 'thumbnail' && typeof img.media !== 'number',
  )

  return (
    <section className="container my-10">
      <BreedHero breed={breed} heroImage={heroImage?.media} thumbnail={thumbnail?.media} />
    </section>
  )
}
