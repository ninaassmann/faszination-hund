import type { Payload } from 'payload'

type CoatColorSeed = {
  name: string
  group: 'solid' | 'pattern' | 'multi'
  colorCode: string[]
}

const coatColors: CoatColorSeed[] = [
  {
    name: 'Weiß',
    group: 'solid',
    colorCode: ['#F5F5F0'],
  },
  {
    name: 'Creme',
    group: 'solid',
    colorCode: ['#F3E5AB'],
  },
  {
    name: 'Beige / Sandfarben',
    group: 'solid',
    colorCode: ['#D4B996'],
  },
  {
    name: 'Gold / Golden',
    group: 'solid',
    colorCode: ['#D9A441'],
  },
  {
    name: 'Rot / Kastanie',
    group: 'solid',
    colorCode: ['#A44A27'],
  },
  {
    name: 'Braun / Schokolade',
    group: 'solid',
    colorCode: ['#5A3825'],
  },
  {
    name: 'Dunkelbraun',
    group: 'solid',
    colorCode: ['#3E2723'],
  },
  {
    name: 'Schwarz',
    group: 'solid',
    colorCode: ['#1A1A1A'],
  },
  {
    name: 'Grau / Silber',
    group: 'solid',
    colorCode: ['#9E9E9E'],
  },
  {
    name: 'Blaugrau / Stahlgrau',
    group: 'solid',
    colorCode: ['#6B7A8F'],
  },
  {
    name: 'Fawn (Rehfarben)',
    group: 'solid',
    colorCode: ['#C6A664'],
  },
  {
    name: 'Isabellfarben',
    group: 'solid',
    colorCode: ['#EED9B7'],
  },
  {
    name: 'Gestromt (Brindle)',
    group: 'pattern',
    colorCode: ['#4B2C18', '#C8A978'], // dunkelbraun + sandfarben
  },
  {
    name: 'Merle (Marmoriert)',
    group: 'pattern',
    colorCode: ['#8C8FA3', '#C0C2CF'], // graublau + silber
  },
  {
    name: 'Sable (Wildfarben)',
    group: 'pattern',
    colorCode: ['#A67843', '#3E2723'], // goldbraun + dunkelbraun
  },
  {
    name: 'Tricolor (Dreifarbig)',
    group: 'multi',
    colorCode: ['#1A1A1A', '#E8C17D', '#FAFAFA'], // schwarz + tan + weiß
  },
  {
    name: 'Schwarz-Weiß',
    group: 'multi',
    colorCode: ['#1A1A1A', '#FAFAFA'],
  },
  {
    name: 'Braun-Weiß',
    group: 'multi',
    colorCode: ['#6B4226', '#FAFAFA'],
  },
  {
    name: 'Rot-Weiß',
    group: 'multi',
    colorCode: ['#B35B2C', '#F5F5F0'],
  },
  {
    name: 'Grau-Weiß',
    group: 'multi',
    colorCode: ['#7E7E7E', '#F5F5F0'],
  },
]

export async function seedCoatColors(payload: Payload) {
  for (const color of coatColors) {
    const existing = await payload.find({
      collection: 'coatColors',
      where: {
        name: {
          equals: color.name,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'coatColors',
        data: color,
      })
      console.log(`✅ Added: ${color.name}`)
    } else {
      console.log(`⚪ Skipped (exists): ${color.name}`)
    }
  }

  console.log('✅ Finished seeding colors.')
}
