import { Payload } from 'payload'

const countriesSeed: {
  name: string
  continent: 'europe' | 'asia' | 'north_america' | 'south_america' | 'oceania' | 'africa'
}[] = [
  { name: 'Deutschland', continent: 'europe' },
  { name: 'Frankreich', continent: 'europe' },
  { name: 'Italien', continent: 'europe' },
  { name: 'England', continent: 'europe' },
  { name: 'Russland', continent: 'europe' },
  { name: 'China', continent: 'asia' },
  { name: 'Japan', continent: 'asia' },
  { name: 'Indien', continent: 'asia' },
  { name: 'USA', continent: 'north_america' },
  { name: 'Kanada', continent: 'north_america' },
  { name: 'Mexiko', continent: 'north_america' },
  { name: 'Brasilien', continent: 'south_america' },
  { name: 'Argentinien', continent: 'south_america' },
  { name: 'Australien', continent: 'oceania' },
  { name: 'Neuseeland', continent: 'oceania' },
  { name: 'Südafrika', continent: 'africa' },
  { name: 'Ägypten', continent: 'africa' },
]

export async function seedCountries(payload: Payload) {
  for (const country of countriesSeed) {
    const existing = await payload.find({
      collection: 'countries',
      where: {
        name: {
          equals: country.name,
        },
      },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'countries',
        data: country,
      })
    }
  }
}
