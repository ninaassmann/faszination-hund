import type { Dogbreed, Media, Tag } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  breed: Dogbreed
  heroImage?: Media
}

export function BreedHero({ breed, heroImage }: Props) {
  return (
    <section className="mt-40">
      <h1>{breed.breed}</h1>
      {breed.general?.otherNames?.map((name, index) => {
        return <span key={index}>{name}</span>
      })}
      <div className="flex flex-wrap gap-2 my-10">
        {breed.general?.tags?.map(
          (tag): tag is Tag => typeof tag !== 'number', // Type Guard
        ) &&
          breed.general.tags
            .filter((tag): tag is Tag => typeof tag !== 'number') // nur Tag-Objekte
            .map((tag) => (
              <span key={tag.id} className="badge badge-ghost">
                {tag.name}
              </span>
            ))}
      </div>
      {heroImage?.url && (
        <div className="rounded-2xl aspect-[10/2] overflow-clip relative">
          <Image
            src={heroImage?.url}
            alt={heroImage?.alt}
            width={heroImage?.width || 1000}
            height={heroImage?.height || 283}
            className="w-full"
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
    </section>
  )
}
