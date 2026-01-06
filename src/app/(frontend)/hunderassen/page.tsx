import { getPayload } from 'payload'
import type { Media, Dogbreed, Tag } from '@/payload-types'
import configPromise from '@payload-config'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const breeds: { docs: Dogbreed[] } = await payload.find({
    collection: 'dogbreeds',
    depth: 3,
    limit: 12,
    overrideAccess: false,
  })

  return (
    <section className="container flex flex-wrap gap-6 my-40">
      {breeds.docs.map((breed) => {
        const thumbnail = breed.images?.find(
          (img): img is { media: Media; type: 'thumbnail' } =>
            img.type === 'thumbnail' && typeof img.media !== 'number',
        )

        return (
          <div className="card bg-base-100 w-96 shadow-sm overflow-clip" key={breed.id}>
            {thumbnail?.media.url ? (
              <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4]">
                <Image
                  src={thumbnail.media.url}
                  alt={thumbnail.media.alt || 'Bild'}
                  width={thumbnail.media.width || 400}
                  height={thumbnail.media.height || 300}
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4]">
                <ImageIcon />
              </div>
            )}
            <div className="card-body justify-between">
              <h2 className="card-title">{breed.breed}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
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
              <div className="card-actions justify-end">
                <Link href={`/hunderassen/${breed.slug}`} className="btn btn-primary">
                  Mehr erfahren
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
