export function getSectionClass(backgroundColor?: string | null) {
  switch (backgroundColor) {
    case 'var(--frontend-primary)':
      return 'section-bg-primary'
    case 'var(--frontend-secondary)':
      return 'section-bg-secondary'
    case 'var(--frontend-base-200)':
      return 'section-bg-light'
    case 'var(--frontend-neutral)':
      return 'section-bg-dark'
    default:
      return 'bg-white'
  }
}
