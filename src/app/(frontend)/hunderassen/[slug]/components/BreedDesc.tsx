import { Dogbreed } from '@/payload-types'
import Link from 'next/link'

type Props = {
  breed: Dogbreed
}

export function BreedDesc({ breed }: Props) {
  return (
    <section className="container my-16 sm:my-20">
      {breed.descriptions?.map((desc) => {
        return (
          <div key={desc.id} className="mb-10 max-w-full md:max-w-[80%]">
            <h2>{desc.title}</h2>
            <p>{desc.content}</p>
            {desc.source && !desc.source.includes('fci.be') && (
              <Link
                href={desc.source}
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-ghost"
              >
                Quelle
              </Link>
            )}
          </div>
        )
      })}
    </section>
  )
}
