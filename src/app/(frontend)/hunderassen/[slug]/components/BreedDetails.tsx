import { CoatColor, CoatType, Country, Dogbreed } from '@/payload-types'

type Props = {
  breed: Dogbreed
  origin: Country
  coatColors: CoatColor[]
  coatTypes: CoatType[]
}

export function BreedDetails({ breed, origin, coatColors, coatTypes }: Props) {
  const details = [
    { label: 'Gewicht Hündin', value: breed.details?.['weight-female'] },
    { label: 'Gewicht Rüde', value: breed.details?.['weight-male'] },
    { label: 'Widerristhöhe Hündin', value: breed.details?.['height-female'] },
    { label: 'Widerristhöhe Rüde', value: breed.details?.['height-male'] },
    { label: 'Lebenserwartung Hündin', value: breed.details?.['age-female'] },
    { label: 'Lebenserwartung Rüde', value: breed.details?.['age-male'] },
  ].filter((item) => item.value)

  return (
    <section className="container my-16 sm:my-20">
      <h2>Details</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {origin && (
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">Herkunft</dt>
            <dd>{origin.name}</dd>
          </div>
        )}

        {details.map((item, index) => (
          <div key={index}>
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}

        {coatColors.length > 0 && (
          <div>
            <dt className="text-sm text-muted">Fellfarben</dt>
            <dd>{coatColors.map((c) => c.name).join(', ')}</dd>
          </div>
        )}

        {coatTypes.length > 0 && (
          <div>
            <dt className="text-sm text-muted">Fellarten</dt>
            <dd>{coatTypes.map((c) => c.name).join(', ')}</dd>
          </div>
        )}
      </dl>
    </section>
  )
}
