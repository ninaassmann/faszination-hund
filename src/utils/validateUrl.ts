export function validateUrl(value: string | null | undefined) {
  if (!value) return true

  try {
    new URL(value)
    return true
  } catch {
    return 'Bitte eine gültige URL eingeben'
  }
}
