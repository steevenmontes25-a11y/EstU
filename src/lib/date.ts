export const DAY_MS = 86_400_000

/** Clave YYYY-MM-DD en hora local (no UTC: importa para la racha diaria). */
export function dateKey(d: Date = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1)
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + n)
  return copy
}

export function startOfDay(d: Date = new Date()): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

/** Días entre hoy y una fecha YYYY-MM-DD. Negativo si ya pasó. */
export function daysUntil(key: string): number {
  return Math.round((fromKey(key).getTime() - startOfDay().getTime()) / DAY_MS)
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY_MS)
}

const longFmt = new Intl.DateTimeFormat('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })
const shortFmt = new Intl.DateTimeFormat('es-EC', { day: '2-digit', month: 'short' })
const weekdayFmt = new Intl.DateTimeFormat('es-EC', { weekday: 'short' })

export const formatLong = (d: Date) => longFmt.format(d)
export const formatShort = (d: Date) => shortFmt.format(d)
export const formatWeekday = (d: Date) => weekdayFmt.format(d).replace('.', '')

export const capitalize = (s: string) => (s ? s[0]!.toUpperCase() + s.slice(1) : s)

/** Lunes de la semana a la que pertenece la fecha. */
export function startOfWeek(d: Date): Date {
  const copy = startOfDay(d)
  const dow = (copy.getDay() + 6) % 7 // 0 = lunes
  copy.setDate(copy.getDate() - dow)
  return copy
}

/** Duración legible para resúmenes: "45 s", "12 min", "1 h 20 min". */
export function formatLength(ms: number): string {
  const seconds = Math.round(ms / 1000)
  if (seconds < 60) return `${seconds} s`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`
}

/** Cronómetro en formato m:ss, para la cuenta regresiva del simulacro. */
export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${`${s}`.padStart(2, '0')}`
}
