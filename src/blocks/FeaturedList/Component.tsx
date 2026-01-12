import type { FeaturedList as FeaturedListProps, Dog, Dogbreed, Tag } from '@/payload-types'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
} & FeaturedListProps

// Type Guards, um von number | Dog/Dogbreed auf Dog/Dogbreed zu kommen
const isDog = (value: number | Dog): value is Dog => typeof value === 'object' && value !== null

const isDogbreed = (value: number | Dogbreed): value is Dogbreed =>
  typeof value === 'object' && value !== null

export const FeaturedListBlock: React.FC<Props> = (props) => {
  const { title, text, type, featuredBreeds, featuredDogs, showButton } = props

  const hasBreeds = Array.isArray(featuredBreeds) && featuredBreeds.length > 0
  const hasDogs = Array.isArray(featuredDogs) && featuredDogs.length > 0
  const itemsCount = type === 'dogs' ? featuredDogs?.length : featuredBreeds?.length
  const gridClass =
    itemsCount === 1
      ? 'grid-cols-1'
      : itemsCount === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  const baseCardClass = 'card bg-base-100 shadow-sm overflow-clip'
  const cardClass = itemsCount === 1 ? `${baseCardClass} sm:card-side` : `${baseCardClass}`

  if ((!hasBreeds && type === 'dogbreeds') || (!hasDogs && type === 'dogs')) {
    return null
  }

  return (
    <section className="py-28">
      <div className="container">
        {title && <h2>{title}</h2>}
        {text && <p className="max-w-[80%]">{text}</p>}

        <div className={`mt-8 grid gap-6 ${gridClass}`}>
          {type === 'dogs' &&
            featuredDogs?.filter(isDog).map((dog) => {
              const thumbnail = dog.images?.find(
                (img) => img.type === 'thumbnail' && typeof img.media === 'object',
              )
              const media =
                thumbnail?.media && typeof thumbnail.media === 'object' ? thumbnail.media : null
              const imageUrl = media?.url ?? undefined
              const imageAlt = media?.alt ?? dog.name

              return (
                <article key={dog.id} className={cardClass}>
                  {imageUrl ? (
                    <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4] relative">
                      <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4] relative">
                      <ImageIcon />
                    </div>
                  )}

                  <div className="card-body justify-between gap-2 min-w-1/2">
                    <h3 className="card-title">{dog.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {dog.location}
                      {dog.adoptionStatus === 'available' && ' · Vermittlung möglich'}
                    </p>

                    <div className="card-actions justify-end">
                      <Link href={`/hunde/${dog.slug}`} className="btn btn-link">
                        Mehr zu {dog.name}
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}

          {type === 'dogbreeds' &&
            featuredBreeds?.filter(isDogbreed).map((breed) => {
              const thumbnail = breed.images?.find(
                (img) => img.type === 'thumbnail' && typeof img.media === 'object',
              )
              const media =
                thumbnail?.media && typeof thumbnail.media === 'object' ? thumbnail.media : null
              const imageUrl = media?.url ?? undefined
              const imageAlt = media?.alt ?? breed.breed

              return (
                <article key={breed.id} className={cardClass}>
                  {imageUrl ? (
                    <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4] relative">
                      <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4] relative">
                      <ImageIcon />
                    </div>
                  )}

                  <div className="card-body justify-between gap-2 min-w-1/2">
                    <div className="flex flex-col gap-4">
                      <h3 className="card-title">{breed.breed}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {breed.general?.tags?.map((tag): tag is Tag => typeof tag !== 'number') &&
                          breed.general.tags
                            .filter((tag): tag is Tag => typeof tag !== 'number')
                            .map((tag) => (
                              <span key={tag.id} className="badge badge-ghost">
                                {tag.name}
                              </span>
                            ))}
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <Link href={`/hunderassen/${breed.slug}`} className="btn btn-link">
                        Mehr zur Rasse
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
        </div>

        {showButton && (
          <div className="mt-8">
            <Link
              href={type === 'dogbreeds' ? '/hunderassen' : '/hunde'}
              className="btn btn-primary"
            >
              {type === 'dogbreeds' ? 'Alle Hunderassen ansehen' : 'Alle Hunde ansehen'}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
