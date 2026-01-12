import type { Dog } from '@/payload-types'

function isInGermany(location?: string | null): boolean {
  if (!location) return false
  const normalized = location.toLowerCase()

  return normalized.includes('deutschland') || normalized.includes('germany')
}

function formatDate(value?: string | null): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getAdoptionLabel(dog: Dog): string | null {
  const { location, adoptionStatus, earliestArrivalType, earliestArrivalDate, adoptionDate } = dog

  const abroad = !isInGermany(location)

  // Für jetzt: nur Hunde außerhalb Deutschlands betrachten
  if (!abroad) {
    // später: hier Fälle für "Pflegestelle in Deutschland", "Tierheim in Deutschland" etc.
    return null
  }

  const earliestDate = formatDate(earliestArrivalDate)
  const adoptedOn = formatDate(adoptionDate)

  // Bereits vermittelt
  if (adoptionStatus === 'adopted') {
    if (adoptedOn) return `Vermittelt am ${adoptedOn}`
    return 'Bereits vermittelt'
  }

  // Reserviert
  if (adoptionStatus === 'reserved') {
    if (earliestArrivalType === 'fixed' && earliestDate) {
      return `Reserviert – Ausreise am ${earliestDate}`
    }
    if (earliestArrivalType === 'estimated' && earliestDate) {
      return `Reserviert – voraussichtliche Ausreise ab dem ${earliestDate} möglich`
    }
    return 'Reserviert'
  }

  // Vermittlungsfähig (available)
  if (adoptionStatus === 'available') {
    if (earliestArrivalType === 'fixed' && earliestDate) {
      return `Ausreise am ${earliestDate} möglich`
    }
    if (earliestArrivalType === 'estimated' && earliestDate) {
      return `Voraussichtliche Ausreise ab dem ${earliestDate} möglich`
    }
    return 'Ausreisezeitpunkt noch offen'
  }

  // Fallback: kein Adoption-Status, aber Ausreisedaten gepflegt
  if (earliestArrivalType === 'fixed' && earliestDate) {
    return `Ausreise am ${earliestDate} möglich`
  }
  if (earliestArrivalType === 'estimated' && earliestDate) {
    return `Voraussichtliche Ausreise ab dem ${earliestDate} möglich`
  }

  return null
}
