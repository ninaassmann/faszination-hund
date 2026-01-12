import { getPayload } from 'payload'
import type { Media, Dogbreed, Tag } from '@/payload-types'
import configPromise from '@payload-config'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { RenderBlocks } from '@/blocks'
import { getPageBySlug } from '@/utils/getPageBySlug'

export default async function DogbreedPage() {
  const payload = await getPayload({ config: configPromise })
  const page = await getPageBySlug('hunderassen')

  const breeds: { docs: Dogbreed[] } = await payload.find({
    collection: 'dogbreeds',
    depth: 3,
    limit: 12,
    overrideAccess: false,
  })

  if (!page) {
    console.warn('Page "hunde" not found')
    return null
  }

  return (
    <>
      <RenderBlocks blocks={page.content} />
      <section className="my-16 sm:my-20">
        <div className="container grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.docs.map((breed) => {
            const thumbnail = breed.images?.find(
              (img): img is { media: Media; type: 'thumbnail' } =>
                img.type === 'thumbnail' && typeof img.media !== 'number',
            )

            return (
              <div className="card bg-base-100 shadow-sm overflow-clip" key={breed.id}>
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
                  <div className="bg-gray-200 w-full h-64 flex items-center justify-center aspect-[3/4]">
                    <ImageIcon />
                  </div>
                )}
                <div className="card-body justify-between gap-2 min-w-1/2">
                  <h3 className="card-title mb-2">{breed.breed}</h3>
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
                    <Link href={`/hunderassen/${breed.slug}`} className="btn btn-link">
                      Mehr erfahren
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
