import type { Payload } from 'payload'

const coatTypes = [
  {
    name: 'Kurzhaar',
    value: 'short',
    description:
      'Glattes, eng anliegendes Fell mit wenig Unterwolle. Pflegeleicht und schmutzabweisend, häufig bei Jagd- und Laufhunden.',
    exampleBreeds: [],
  },
  {
    name: 'Mittellanghaar',
    value: 'medium',
    description:
      'Dichtes, leicht längeres Fell mit mäßiger Unterwolle. Benötigt regelmäßiges Bürsten, um Verfilzungen zu vermeiden.',
    exampleBreeds: [],
  },
  {
    name: 'Langhaar',
    value: 'long',
    description:
      'Weiches, oft fließendes Fell mit dichter Unterwolle. Erfordert häufige Pflege, neigt zu Verfilzungen.',
    exampleBreeds: [],
  },
  {
    name: 'Rauhhaar',
    value: 'wire',
    description:
      'Dichtes, drahtiges Deckhaar mit weicher Unterwolle. Wetterfest und robust – typisch für Terrierarten.',
    exampleBreeds: [],
  },
  {
    name: 'Lockenhaar',
    value: 'curly',
    description:
      'Krauses, dicht gelocktes Fell ohne nennenswerte Unterwolle. Wird kontinuierlich nachgebildet und muss regelmäßig geschnitten werden.',
    exampleBreeds: [],
  },
  {
    name: 'Wollhaar / Filzhaar',
    value: 'woolly',
    description:
      'Langes, weiches Fell, das zu Kordeln oder Filz neigt. Kommt selten vor, z. B. beim Puli oder Komondor.',
    exampleBreeds: [],
  },
  {
    name: 'Stockhaar',
    value: 'double',
    description:
      'Typischer Doppelfelltyp: dichtes Unterfell und mittellanges, glattes Deckhaar. Wasserabweisend und temperaturausgleichend.',
    exampleBreeds: [],
  },
  {
    name: 'Glatt- / Seidenhaar',
    value: 'silky',
    description:
      'Glattes, seidiges Fell, meist ohne Unterwolle. Besonders fein und glänzend, aber anfällig für Knotenbildung.',
    exampleBreeds: [],
  },
]

export async function seedCoatTypes(payload: Payload) {
  for (const type of coatTypes) {
    const existing = await payload.find({
      collection: 'coatTypes',
      where: {
        name: {
          equals: type.name,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'coatTypes',
        data: type,
      })
      console.log(`✅ Added: ${type.name}`)
    } else {
      console.log(`⚪ Skipped (exists): ${type.name}`)
    }
  }

  console.log('✅ Finished seeding types.')
}
