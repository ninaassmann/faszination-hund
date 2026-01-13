import { Payload } from 'payload'

type FciSectionSeed = {
  name: string
  number: number
  group: number // referenziert group_id aus fci_groups
}

const fciSectionsSeed: FciSectionSeed[] = [
  { name: 'Sektion 1: Schäferhunde', number: 1, group: 1 },
  { name: 'Sektion 2: Treibhunde (ausgenommen Schweizer Sennenhunde)', number: 2, group: 1 },
  { name: 'Sektion 1: Hochläufige Terrier', number: 1, group: 3 },
  { name: 'Sektion 2: Niederläufige Terrier', number: 2, group: 3 },
  { name: 'Sektion 3: Bullartige Terrier', number: 3, group: 3 },
  { name: 'Sektion 4: Zwerg-Terriers', number: 4, group: 3 },
  { name: 'Sektion 1: Pinscher und Schnauzer', number: 1, group: 2 },
  { name: 'Sektion 2: Molossoide', number: 2, group: 2 },
  { name: 'Sektion 3: Schweizer Sennenhunde', number: 3, group: 2 },
  { name: 'Sektion 1: Nordische Schlittenhunde', number: 1, group: 5 },
  { name: 'Sektion 2: Nordische Jagdhunde', number: 2, group: 5 },
  { name: 'Sektion 3: Nordische Wach- und Hütehunde', number: 3, group: 5 },
  { name: 'Sektion 4: Europäische Spitze', number: 4, group: 5 },
  { name: 'Sektion 5: Asiatische Spitze und verwandte Rassen', number: 5, group: 5 },
  { name: 'Sektion 6: Urtyp', number: 6, group: 5 },
  { name: 'Sektion 7: Urtyp - Hunde zur jagdlichen Verwendung', number: 7, group: 5 },
  { name: 'Sektion 1: Laufhunde', number: 1, group: 6 },
  { name: 'Sektion 2: Schweisshunde', number: 2, group: 6 },
  { name: 'Sektion 3: Verwandte Rassen', number: 3, group: 6 },
  { name: 'Sektion 1: Kontinentale Vorstehhunde', number: 1, group: 7 },
  { name: 'Sektion 2: Britische und Irische Vorstehhunde', number: 2, group: 7 },
  { name: 'Sektion 1: Apportierhunde', number: 1, group: 8 },
  { name: 'Sektion 2: Stöberhunde', number: 2, group: 8 },
  { name: 'Sektion 3: Wasserhunde', number: 3, group: 8 },
  { name: 'Sektion 1: Bichons und verwandte Rassen', number: 1, group: 9 },
  { name: 'Sektion 2: Pudel', number: 2, group: 9 },
  { name: 'Sektion 3: Kleine belgische Hunderassen', number: 3, group: 9 },
  { name: 'Sektion 4: Haarlose Hunde', number: 4, group: 9 },
  { name: 'Sektion 5: Tibetanische Hunderassen', number: 5, group: 9 },
  { name: 'Sektion 6: Chihuahueno', number: 6, group: 9 },
  { name: 'Sektion 7: Englische Gesellschaftsspaniel', number: 7, group: 9 },
  { name: 'Sektion 8: Japanische Spaniel und Pekingesen', number: 8, group: 9 },
  { name: 'Sektion 9: Kontinentaler Zwergspaniel und andere', number: 9, group: 9 },
  { name: 'Sektion 10: Kromfohrländer', number: 10, group: 9 },
  { name: 'Sektion 11: Kleine doggenartige Hunde', number: 11, group: 9 },
  { name: 'Sektion 1: Langhaarige oder befederte Windhunde', number: 1, group: 10 },
  { name: 'Sektion 2: Rauhhaarige Windhunde', number: 2, group: 10 },
  { name: 'Sektion 3: Kurzhaarige Windhunde', number: 3, group: 10 },
]

export async function seedFciSections(payload: Payload) {
  for (const section of fciSectionsSeed) {
    const existing = await payload.find({
      collection: 'fciSections',
      where: {
        name: {
          equals: section.name,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'fciSections',
        data: {
          ...section,
          group: section.group, // referenz auf die fci_group
        },
      })
      console.log(`✅ Added: ${section.name}`)
    } else {
      console.log(`⚪ Skipped (exists): ${section.name}`)
    }
  }

  console.log('✅ Finished seeding fci_sections.')
}
