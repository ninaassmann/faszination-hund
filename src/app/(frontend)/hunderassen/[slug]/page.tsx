import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BreedHero } from './components/BreedHero'
import { CoatColor, CoatType, Country, Dogbreed, Media } from '@/payload-types'
import { FCI } from './components/FCI'
import { BreedDetails } from './components/BreedDetails'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const dogbreeds = await payload.find({
    collection: 'dogbreeds',
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const breed = dogbreeds.docs[0] as Dogbreed

  const origin = breed.details?.origin as Country
  const coatColors = (breed.details?.coatColors || []).filter(
    (c): c is CoatColor => typeof c !== 'number',
  )
  const coatTypes = (breed.details?.coatTypes || []).filter(
    (c): c is CoatType => typeof c !== 'number',
  )

  const heroImage = breed.images?.find((img) => img.type === 'gallery')?.media as Media | undefined
  const thumbnail = breed.images?.find((img) => img.type === 'thumbnail')?.media as
    | Media
    | undefined

  return (
    <section className="container my-10">
      <BreedHero breed={breed} heroImage={heroImage} thumbnail={thumbnail} />
      <BreedDetails breed={breed} origin={origin} coatColors={coatColors} coatTypes={coatTypes} />
      {breed.fci && <FCI fci={breed.fci} />}
    </section>
  )
}
