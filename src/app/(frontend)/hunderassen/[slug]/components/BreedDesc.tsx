import { Dogbreed } from '@/payload-types'

type Props = {
  breed: Dogbreed
}

export function BreedDesc({ breed }: Props) {
  return (
    <section className="mt-10">
      {breed.descriptions?.map((desc) => {
        return (
          <div key={desc.id} className="mb-10">
            <h2>{desc.title}</h2>
            <p>{desc.content}</p>
          </div>
        )
      })}
    </section>
  )
}
