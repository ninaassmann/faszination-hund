import { Payload } from 'payload'

type FciGroupSeed = {
  name: string
  number: number
}

const fciGroupsSeed: FciGroupSeed[] = [
  { name: 'Gruppe 1: Hütehunde und Treibhunde (ausgenommen Schweizer Sennenhunde)', number: 1 },
  { name: 'Gruppe 2: Pinscher und Schnauzer - Molosser - Schweizer Sennenhunde', number: 2 },
  { name: 'Gruppe 3: Terrier', number: 3 },
  { name: 'Gruppe 4: Dachshunde', number: 4 },
  { name: 'Gruppe 5: Spitze und Hunde vom Urtyp', number: 5 },
  { name: 'Gruppe 6: Laufhunde, Schweisshunde und verwandte Rassen', number: 6 },
  { name: 'Gruppe 7: Vorstehhunde', number: 7 },
  { name: 'Gruppe 8: Apportierhunde - Stöberhunde - Wasserhunde', number: 8 },
  { name: 'Gruppe 9: Gesellschafts- und Begleithunde', number: 9 },
  { name: 'Gruppe 10: Windhunde', number: 10 },
]

export async function seedFciGroups(payload: Payload) {
  for (const group of fciGroupsSeed) {
    const existing = await payload.find({
      collection: 'fciGroups',
      where: {
        name: {
          equals: group.name,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'fciGroups',
        data: group,
      })
      console.log(`✅ Added: ${group.name}`)
    } else {
      console.log(`⚪ Skipped (exists): ${group.name}`)
    }
  }

  console.log('✅ Finished seeding fci_groups.')
}
