export function calculateAge(
  birthDate: string | null | undefined,
): { years: number; months: number } | null {
  if (!birthDate) return null

  const birth = new Date(birthDate)
  if (isNaN(birth.getTime())) return null

  const today = new Date()

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()

  if (today.getDate() < birth.getDate()) {
    months-- // noch kein voller Monat
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months }
}
