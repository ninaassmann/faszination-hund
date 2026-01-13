import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media, Dog } from '@/payload-types'

import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import { RenderBlocks } from '@/blocks'
import { getPageBySlug } from '@/utils/getPageBySlug'

export default async function DogPage() {
  const payload = await getPayload({ config: configPromise })
  const page = await getPageBySlug('hunde')

  const dogs: { docs: Dog[] } = await payload.find({
    collection: 'dogs',
    depth: 3,
    limit: 12,
    overrideAccess: false,
  })

  return (
    <>
      <RenderBlocks blocks={page.content} />
      <section className="my-16 sm:my-20">
        <div className="container grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {dogs.docs.map((dog) => {
            const thumbnail = dog.images?.find(
              (img): img is { media: Media; type: 'thumbnail' } =>
                img.type === 'thumbnail' && typeof img.media !== 'number',
            )

            return (
              <article className="card bg-base-100 shadow-sm overflow-clip" key={dog.id}>
                {thumbnail?.media.url ? (
                  <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4] relative">
                    <Image
                      src={thumbnail.media.url}
                      alt={thumbnail.media.alt || 'Bild'}
                      fill
                      className="object-cover"
                    />
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
        </div>
      </section>
    </>
  )
}
