import { Dog } from '@/payload-types'

export function getLocationTypeLabel(type: Dog['locationType']) {
  if (!type) return 'Tierheim'
  const map: Record<NonNullable<Dog['locationType']>, string> = {
    shelter: 'Tierheim',
    fosterHome: 'Pflegestelle',
    euthanasiaCenter: 'Tötungsstation',
  }
  return map[type] ?? 'Tierheim'
}
