import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Dog, Dogbreed, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { getLocationTypeLabel } from '@/utils/getLocationTypeLabel'
import { getAdoptionLabel } from '@/utils/getAdoptionLabel'
import { calculateAge } from '@/utils/calculateAge'
import { RenderBlocks } from '@/blocks'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const dogs = await payload.find({
    collection: 'dogs',
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const dog = dogs.docs[0] as Dog

  const heroImage = dog.images?.find((img) => img.type === 'gallery')?.media as Media | undefined
  const thumbnail = dog.images?.find((img) => img.type === 'thumbnail')?.media as Media | undefined
  const locationType = getLocationTypeLabel(dog.locationType)
  const adoptionLabel = getAdoptionLabel(dog)
  const age = calculateAge(dog.birthDate)
  const ageInfo =
    dog.birthDateType == 'exact'
      ? 'Geburtsdatum bekannt'
      : dog.birthDateType == 'estimated'
        ? 'Geburtsdatum geschätzt'
        : 'Unbekannt'
  const gender = dog.gender == 'male' ? 'Männlich' : 'Weiblich'
  const castration =
    dog.castration == 'yes' ? 'Ja' : dog.castration == 'tooYoung' ? 'Nein, zu jung' : 'Nein'
  const breeds = dog.breeds as Dogbreed[]
  const isMixed = dog.mixedBreed == true ? '(Mischling)' : '(Reinrassig)'
  const breedType =
    dog.breedType == 'estimated'
      ? 'Geschätzt'
      : dog.breedType == 'known'
        ? 'Bekannt'
        : 'Nicht bekannt'

  return (
    <>
      <section className="container my-16 sm:my-20">
        <h1>{dog.name}</h1>
        <span className="text-sm text-base-content/70 block mb-2">
          {dog.location} · {locationType}
          {dog.adoptionStatus === 'available' && ' · Vermittlung möglich'}
        </span>
        <p>{adoptionLabel}</p>
        <div className="grid grid-cols-8 grid-rows-3 md:grid-rows-4 mt-6 sm:mt-10 -ml-1">
          {heroImage?.url && (
            <div className="rounded-2xl aspect-video sm:aspect-[10/3] overflow-clip relative col-start-1 row-start-1 col-span-8 row-span-3">
              <Image
                src={heroImage?.url}
                alt={heroImage?.alt}
                width={heroImage?.width || 1000}
                height={heroImage?.height || 283}
                className="w-full h-full object-cover"
              />
              {heroImage?.source && (
                <Link
                  href={heroImage.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge absolute bottom-2 right-2 z-10"
                >
                  Adobe Stock
                </Link>
              )}
            </div>
          )}
          {thumbnail?.url && (
            <div className="hidden md:flex rounded-2xl overflow-clip relative col-start-2 col-span-2 row-start-3 row-span-2 w-full h-full">
              <Image
                src={thumbnail?.url}
                alt={thumbnail?.alt}
                width={thumbnail?.width || 1000}
                height={thumbnail?.height || 283}
                className="w-full h-full object-cover"
              />
              {thumbnail?.source && (
                <Link
                  href={thumbnail.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge absolute bottom-2 right-2 z-10"
                >
                  Adobe Stock
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="container my-16 sm:my-20">
        <h2>Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {dog.location && (
            <div>
              <dt className="text-sm text-muted">Aktueller Aufenthalt</dt>
              <dd>
                {dog.location}, {locationType && locationType}
              </dd>
            </div>
          )}
          {gender && (
            <div>
              <dt className="text-sm text-muted">Geschlecht</dt>
              <dd>{gender}</dd>
            </div>
          )}
          {castration && (
            <div>
              <dt className="text-sm text-muted">Kastration</dt>
              <dd>{castration}</dd>
            </div>
          )}
          {dog.castrationInfo && (
            <div>
              <dt className="text-sm text-muted">Infos</dt>
              <dd>{dog.castrationInfo}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-muted">Alter</dt>
            <dd>
              {age
                ? age.years < 1
                  ? `${age.months} Monat${age.months !== 1 ? 'e' : ''}, ${ageInfo}`
                  : `${age.years} Jahr${age.years !== 1 ? 'e' : ''}, ${ageInfo}`
                : `${ageInfo}`}
            </dd>
          </div>
          {breeds && (
            <div>
              <dt className="text-sm text-muted">Hunderassen ({breedType})</dt>
              <dd>
                {breeds.map((breed) => {
                  return (
                    <div key={breed.id}>
                      {breed.breed} {isMixed}
                    </div>
                  )
                })}
              </dd>
            </div>
          )}
        </dl>
      </section>
      <RenderBlocks blocks={dog.description} />
    </>
  )
}
