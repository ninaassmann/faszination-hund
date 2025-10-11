import type { Payload } from 'payload'

const tagsSeed: {
  name: string
  category: 'size' | 'roles' | 'character' | 'health' | 'training' | 'social' | 'behavior'
}[] = [
  // Size
  { name: 'Klein', category: 'size' },
  { name: 'Mittelgroß', category: 'size' },
  { name: 'Groß', category: 'size' },
  { name: 'Sehr groß', category: 'size' },

  // Roles / Einsatzbereiche
  { name: 'Familienhund', category: 'roles' },
  { name: 'Wachhund', category: 'roles' },
  { name: 'Jagdhund', category: 'roles' },
  { name: 'Therapiehund', category: 'roles' },
  { name: 'Assistenzhund', category: 'roles' },
  { name: 'Sporthund', category: 'roles' },

  // Character
  { name: 'kinderfreundlich', category: 'character' },
  { name: 'leicht zu trainieren', category: 'character' },

  // Health
  { name: 'pflegeaufwand hoch', category: 'health' },
  { name: 'kann gut alleine bleiben', category: 'health' },
  { name: 'eher Einzelhund', category: 'health' },
  { name: 'Neigung zu Krankheiten (HD, Augen, etc.)', category: 'health' },

  // Training
  { name: 'leicht trainierbar', category: 'training' },
  { name: 'schwer trainierbar', category: 'training' },
  { name: 'lernt schnell neue Tricks', category: 'training' },
  { name: 'benötigt konsequente Führung', category: 'training' },
  { name: 'hohe Lernmotivation', category: 'training' },
  { name: 'selbstständig beim Lernen', category: 'training' },

  // Social
  { name: 'freundlich zu Kindern', category: 'social' },
  { name: 'freundlich zu anderen Hunden', category: 'social' },
  { name: 'verträglich mit Katzen', category: 'social' },
  { name: 'sozial mit Fremden', category: 'social' },
  { name: 'zurückhaltend / vorsichtig', category: 'social' },
  { name: 'territorial / beschützend', category: 'social' },

  // Behaviour
  { name: 'ruhig', category: 'behavior' },
  { name: 'aktiv / energiegeladen', category: 'behavior' },
  { name: 'verspielt', category: 'behavior' },
  { name: 'anhänglich / verschmust', category: 'behavior' },
  { name: 'selbstständig', category: 'behavior' },
  { name: 'wachsam', category: 'behavior' },
  { name: 'starker Jagdtrieb', category: 'behavior' },
  { name: 'Schutztrieb vorhanden', category: 'behavior' },
]

export async function seedTags(payload: Payload) {
  for (const tag of tagsSeed) {
    const existing = await payload.find({
      collection: 'tags',
      where: { name: { equals: tag.name } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'tags',
        data: tag,
      })
    }
  }
}
