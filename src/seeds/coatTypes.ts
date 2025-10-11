import type { Payload } from 'payload'

export const seedCoatTypes = async (payload: Payload) => {
  console.log('🌿 Seeding coatTypes...')

  const coatTypes = [
    {
      name: 'Kurzhaar',
      value: 'short',
      description:
        'Glattes, eng anliegendes Fell mit wenig Unterwolle. Pflegeleicht und schmutzabweisend, häufig bei Jagd- und Laufhunden.',
      exampleBreeds: [], // später mit Dog Breed IDs befüllen
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

  for (const type of coatTypes) {
    await payload.create({
      collection: 'coatTypes',
      data: type,
    })
  }

  console.log(`✅ ${coatTypes.length} coatTypes seeded successfully.`)
}
