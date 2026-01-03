import type { Payload } from 'payload'

type TrainingRequirement = {
  requirement: string
  importance?: 'high' | 'medium' | 'low' | null
}

type RoleSeed = {
  name: string
  value: string
  description: string
  trainingRequirements: TrainingRequirement[]
}

const rolesSeed: RoleSeed[] = [
  {
    name: 'Jagdhund',
    value: 'jagdhund',
    description:
      'Wird zur Jagd auf Wild eingesetzt – z. B. zum Aufspüren, Vorstehen oder Apportieren von erlegtem Wild.',
    trainingRequirements: [
      { requirement: 'Hoher Gehorsam', importance: 'high' },
      { requirement: 'Starker Geruchssinn', importance: 'high' },
      { requirement: 'Ruhige Führung unter Ablenkung', importance: 'medium' },
    ],
  },
  {
    name: 'Hütehund',
    value: 'huetehund',
    description:
      'Hilft beim Treiben und Bewachen von Viehherden – bekannt für hohe Intelligenz und Arbeitsfreude.',
    trainingRequirements: [
      { requirement: 'Schnelle Reaktion auf Signale', importance: 'high' },
      { requirement: 'Selbstständiges Arbeiten', importance: 'medium' },
      { requirement: 'Gutes Sozialverhalten gegenüber Vieh', importance: 'medium' },
    ],
  },
  {
    name: 'Rettungshund',
    value: 'rettungshund',
    description:
      'Sucht nach vermissten Personen – im Gelände, unter Trümmern oder auf Lawinenfeldern.',
    trainingRequirements: [
      { requirement: 'Ausdauer und Kondition', importance: 'high' },
      { requirement: 'Hohe Stressresistenz', importance: 'high' },
      { requirement: 'Teamarbeit mit Hundeführer', importance: 'high' },
    ],
  },
  {
    name: 'Wachhund',
    value: 'wachhund',
    description:
      'Bewacht Haus, Hof oder Eigentum und meldet Eindringlinge – territorial und aufmerksam.',
    trainingRequirements: [
      { requirement: 'Kontrollierte Aggression', importance: 'high' },
      { requirement: 'Gute Nerven in Stresssituationen', importance: 'medium' },
      { requirement: 'Zuverlässige Bindung an Halter', importance: 'high' },
    ],
  },
  {
    name: 'Therapiehund',
    value: 'therapiehund',
    description:
      'Hilft in der tiergestützten Therapie, bringt Ruhe und emotionale Unterstützung für Menschen in schwierigen Situationen.',
    trainingRequirements: [
      { requirement: 'Sanftes, ruhiges Wesen', importance: 'high' },
      { requirement: 'Geduld im Kontakt mit Menschen', importance: 'high' },
      { requirement: 'Soziale Verträglichkeit', importance: 'high' },
    ],
  },
]

export async function seedRoles(payload: Payload) {
  for (const role of rolesSeed) {
    const existing = await payload.find({
      collection: 'roles',
      where: {
        value: {
          equals: role.value,
        },
      },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'roles',
        data: role,
      })
      console.log(`✅ Added: ${role.name}`)
    } else {
      console.log(`⚪ Skipped (exists): ${role.name}`)
    }
  }

  console.log('✅ Finished seeding Roles.')
}
