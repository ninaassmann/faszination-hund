import type { Dogbreed, Media, Tag } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  breed: Dogbreed
  heroImage?: Media
  thumbnail?: Media
}

export function BreedHero({ breed, heroImage, thumbnail }: Props) {
  return (
    <section className="container my-16 sm:my-20">
      <h1>{breed.breed}</h1>
      {breed.general?.otherNames?.map((name, index) => {
        return <span key={index}>{name}</span>
      })}
      <div className="flex flex-wrap gap-2 my-10">
        {breed.general?.tags?.map((tag): tag is Tag => typeof tag !== 'number') &&
          breed.general.tags
            .filter((tag): tag is Tag => typeof tag !== 'number')
            .map((tag) => (
              <span key={tag.id} className="badge badge-ghost">
                {tag.name}
              </span>
            ))}
      </div>
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
  )
}
