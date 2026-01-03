import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './styles.css'

function isPopulated<T>(value: number | T | null | undefined): value is T {
  return typeof value === 'object' && value !== null
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const breeds = await payload.find({
    collection: 'dogbreeds',
    depth: 3,
    limit: 12,
    overrideAccess: false,
  })

  return (
    <div className="container">
      {breeds.docs.map((breed) => (
        <div key={breed.id} className="card card-border bg-base-100">
          <div className="card-body">
            <h3 className="card-title">{breed.breed}</h3>
            {isPopulated(breed.fci?.fciGroup) && <>{breed.fci.fciGroup.name}</>} |{' '}
            {isPopulated(breed.fci?.fciSection) && <>{breed.fci.fciSection.name}</>}
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Mehr Infos</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
