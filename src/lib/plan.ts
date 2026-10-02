import type { SubjectId } from '../types'
import type { SubjectStat } from './stats'
import { addDays, capitalize, dateKey, formatShort, formatWeekday, startOfDay } from './date'

export type PlanBlockKind = 'practica' | 'repaso' | 'simulacro'

export interface PlanBlock {
  kind: PlanBlockKind
  subject?: SubjectId
  questions: number
  minutes: number
}

export interface PlanDay {
  key: string
  date: Date
  weekday: string
  short: string
  isToday: boolean
  blocks: PlanBlock[]
  questions: number
  minutes: number
}

export interface PlanOptions {
  daysLeft: number
  dailyGoal: number
  mockMinutes: number
  mockQuestions: number
  /** Cuántos días mostrar como máximo. */
  horizon?: number
}

/** Estimación de duración: unos 45 segundos por pregunta, redondeado a 5 minutos. */
const minutesFor = (questions: number) => Math.max(5, Math.round((questions * 0.75) / 5) * 5)

/**
 * Reparte los bloques de práctica entre las materias.
 *
 * Cada materia acumula "crédito" proporcional a su necesidad (peso en el examen ×
 * lo floja que esté) y en cada turno se elige la de mayor crédito. Así una materia
 * pesada aparece más veces pero repartida a lo largo de los días, en vez de
 * concentrarse en bloque.
 */
function scheduleSubjects(stats: SubjectStat[], slots: number, perDay: number): SubjectId[] {
  const needs = stats.map((s) => ({
    id: s.id,
    // El +15 evita que una materia ya dominada desaparezca por completo del plan.
    share: s.weight * (100 - s.score + 15),
    credit: 0,
  }))
  const totalShare = needs.reduce((n, s) => n + s.share, 0) || 1
  for (const n of needs) n.share = n.share / totalShare

  const order: SubjectId[] = []
  for (let i = 0; i < slots; i++) {
    for (const n of needs) n.credit += n.share
    // Dentro de un mismo día se evita repetir materia si hay alternativa.
    const usedToday = new Set(order.slice(Math.floor(i / perDay) * perDay, i))
    const candidates = needs.filter((n) => !usedToday.has(n.id))
    const pool = candidates.length ? candidates : needs
    const winner = pool.reduce((best, n) => (n.credit > best.credit ? n : best), pool[0]!)
    winner.credit -= 1
    order.push(winner.id)
  }
  return order
}

export function buildPlan(stats: SubjectStat[], opts: PlanOptions): PlanDay[] {
  const { daysLeft, dailyGoal, mockMinutes, mockQuestions, horizon = 14 } = opts
  const days = Math.max(1, Math.min(horizon, daysLeft > 0 ? daysLeft : horizon))
  const today = startOfDay()

  const reviewCount = Math.max(5, Math.round(dailyGoal * 0.3))
  const practiceBudget = Math.max(5, dailyGoal - reviewCount)
  const blocksPerDay = practiceBudget > 12 ? 2 : 1
  const perBlock = Math.max(5, Math.round(practiceBudget / blocksPerDay))

  // Cada 7 días toca simulacro, y también el día anterior al examen si cae dentro del horizonte.
  const isMockDay = (i: number) => (i + 1) % 7 === 0 || (daysLeft > 1 && i === daysLeft - 2 && i > 0)

  const practiceDays = Array.from({ length: days }, (_, i) => i).filter((i) => !isMockDay(i))
  const queue = scheduleSubjects(stats, practiceDays.length * blocksPerDay, blocksPerDay)

  let cursor = 0
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(today, i)
    const blocks: PlanBlock[] = []

    if (isMockDay(i)) {
      blocks.push({ kind: 'simulacro', questions: mockQuestions, minutes: mockMinutes })
    } else {
      blocks.push({ kind: 'repaso', questions: reviewCount, minutes: minutesFor(reviewCount) })
      for (let b = 0; b < blocksPerDay; b++) {
        const subject = queue[cursor++]
        if (!subject) break
        blocks.push({ kind: 'practica', subject, questions: perBlock, minutes: minutesFor(perBlock) })
      }
    }

    return {
      key: dateKey(date),
      date,
      weekday: capitalize(formatWeekday(date)),
      short: formatShort(date),
      isToday: i === 0,
      blocks,
      questions: blocks.reduce((n, b) => n + b.questions, 0),
      minutes: blocks.reduce((n, b) => n + b.minutes, 0),
    }
  })
}

export const blockLabel: Record<PlanBlockKind, string> = {
  practica: 'Práctica',
  repaso: 'Repaso espaciado',
  simulacro: 'Simulacro completo',
}
