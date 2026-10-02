import type { CardState } from '../types'
import { DAY_MS } from './date'

/**
 * Repetición espaciada SM-2 (el algoritmo detrás de Anki), adaptado a un test
 * de opción múltiple: la calidad de la respuesta se infiere del acierto y del
 * tiempo empleado, en lugar de pedirle al usuario que se autocalifique.
 */

export const MIN_EF = 1.3
const RELEARN_MS = 8 * 60 * 1000 // una pregunta fallada vuelve dentro de la misma sesión

export function newCard(now = Date.now()): CardState {
  return { ef: 2.5, interval: 0, reps: 0, due: now, lapses: 0, seen: 0, correct: 0, streak: 0, lastSeen: 0 }
}

/** Calidad 0-5 a partir del resultado y del tiempo de respuesta. */
export function gradeFor(correct: boolean, ms: number): number {
  if (!correct) return ms < 8000 ? 1 : 2 // fallar rápido suele ser no saberlo; fallar tras pensarlo, casi saberlo
  if (ms < 12_000) return 5
  if (ms < 30_000) return 4
  return 3
}

export function review(card: CardState, correct: boolean, ms: number, now = Date.now()): CardState {
  const q = gradeFor(correct, ms)
  const next: CardState = {
    ...card,
    seen: card.seen + 1,
    correct: card.correct + (correct ? 1 : 0),
    streak: correct ? card.streak + 1 : 0,
    lastSeen: now,
  }

  // Factor de facilidad: baja cuando cuesta, sube ligeramente cuando sale fácil.
  next.ef = Math.max(MIN_EF, card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  if (q < 3) {
    next.reps = 0
    next.interval = 0
    next.lapses = card.lapses + 1
    next.due = now + RELEARN_MS
    return next
  }

  next.reps = card.reps + 1
  if (next.reps === 1) next.interval = 1
  else if (next.reps === 2) next.interval = 6
  else next.interval = Math.max(1, Math.round(card.interval * next.ef))
  next.due = now + next.interval * DAY_MS
  return next
}

/** Una pregunta se considera dominada cuando sobrevivió a varias revisiones espaciadas. */
export const isMastered = (card?: CardState): boolean =>
  !!card && card.reps >= 3 && card.interval >= 21 && card.streak >= 2

export const isDue = (card: CardState | undefined, now = Date.now()): boolean => !!card && card.due <= now

/** Cuánto sabe el usuario de esta pregunta, de 0 a 1. Sirve para ordenar repasos. */
export function strength(card?: CardState): number {
  if (!card || card.seen === 0) return 0
  const accuracy = card.correct / card.seen
  const maturity = Math.min(1, card.interval / 30)
  return 0.6 * accuracy + 0.4 * maturity
}
