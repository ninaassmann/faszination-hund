import payload from 'payload'
import config from '../payload.config'

import { seedCoatColors } from './coatColorsSeed'
import { seedCoatTypes } from './coatTypes'
import { seedCountries } from './countriesSeed'
import { seedRoles } from './rolesSeed'
import { seedTags } from './tagsSeed'

export const runSeed = async () => {
  await payload.init({
    config,
  })

  console.log('🌱 Seeding database...')

  await seedCoatColors(payload)
  await seedCoatTypes(payload)
  await seedCountries(payload)
  await seedRoles(payload)
  await seedTags(payload)

  console.log('✅ Seeding complete')
  process.exit()
}
