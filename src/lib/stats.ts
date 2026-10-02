import type { AppState, SubjectId } from '../types'
import { SUBJECTS, SUBJECT_BY_ID } from '../data/subjects'
import { bySubject } from '../data/questions'
import { isMastered } from './sm2'
import { DAY_MS, addDays, dateKey, formatShort, startOfDay, startOfWeek } from './date'

export interface SubjectStat {
  id: SubjectId
  name: string
  weight: number
  hex: string
  emoji: string
  /** Preguntas del banco en esta materia. */
  total: number
  seen: number
  mastered: number
  learning: number
  pending: number
  due: number
  attempts: number
  correct: number
  /** 0-1 sobre todos los intentos. */
  accuracy: number
  /** 0-1 sobre los últimos 30 intentos de la materia. */
  recentAccuracy: number
  coverage: number
  /** Nivel de preparación de la materia, 0-100. */
  score: number
}

const RECENT_WINDOW = 30

export function subjectStats(state: AppState, now = Date.now()): SubjectStat[] {
  return SUBJECTS.map((subject) => {
    const bank = bySubject(subject.id)
    const total = bank.length
    let seen = 0
    let mastered = 0
    let due = 0

    for (const q of bank) {
      const card = state.cards[q.id]
      if (!card || card.seen === 0) continue
      seen++
      if (isMastered(card)) mastered++
      else if (card.due <= now) due++
    }

    const attemptsOfSubject = state.attempts.filter((a) => a.subject === subject.id)
    const attempts = attemptsOfSubject.length
    const correct = attemptsOfSubject.reduce((n, a) => n + (a.correct ? 1 : 0), 0)
    const recent = attemptsOfSubject.slice(-RECENT_WINDOW)
    const recentCorrect = recent.reduce((n, a) => n + (a.correct ? 1 : 0), 0)

    const accuracy = attempts ? correct / attempts : 0
    const recentAccuracy = recent.length ? recentCorrect / recent.length : 0
    const coverage = total ? seen / total : 0
    const masteryRatio = total ? mastered / total : 0

    // Con pocos intentos la precisión es ruido: se suaviza hacia 0,5 con un prior de 4 respuestas
    // y se pondera por la confianza, para que sin datos no aporte nada al puntaje.
    const smoothed = (correct + 2) / (attempts + 4)
    const confidence = attempts / (attempts + 4)

    const score = Math.round(100 * (0.45 * masteryRatio + 0.3 * smoothed * confidence + 0.25 * coverage))

    return {
      id: subject.id,
      name: subject.name,
      weight: subject.weight,
      hex: subject.hex,
      emoji: subject.emoji,
      total,
      seen,
      mastered,
      learning: seen - mastered,
      pending: total - seen,
      due,
      attempts,
      correct,
      accuracy,
      recentAccuracy,
      coverage,
      score,
    }
  })
}

/** Nivel de preparación global, 0-100, ponderado según el peso de cada materia. */
export function readiness(stats: SubjectStat[]): number {
  const totalWeight = stats.reduce((n, s) => n + s.weight, 0) || 1
  return Math.round(stats.reduce((n, s) => n + s.score * s.weight, 0) / totalWeight)
}

export interface WeakSubject extends SubjectStat {
  /** Cuánto conviene invertir en esta materia: combina debilidad y peso en el examen. */
  priority: number
}

export function weakSubjects(stats: SubjectStat[]): WeakSubject[] {
  const ranked = stats
    .map((s) => ({ ...s, priority: (100 - s.score) * s.weight }))
    .sort((a, b) => b.priority - a.priority)
  const flagged = ranked.filter((s) => s.score < 60)
  return flagged.length ? flagged : ranked.slice(0, 2)
}

export interface WeekPoint {
  label: string
  start: number
  accuracy: number
  count: number
}

/** Precisión semana a semana, para ver la evolución en el tiempo. */
export function weeklyEvolution(state: AppState, weeks = 8): WeekPoint[] {
  const thisWeek = startOfWeek(new Date())
  const points: WeekPoint[] = []
  for (let i = weeks - 1; i >= 0; i--) {
    const start = addDays(thisWeek, -7 * i)
    const end = addDays(start, 7)
    const inWeek = state.attempts.filter((a) => a.at >= start.getTime() && a.at < end.getTime())
    const correct = inWeek.reduce((n, a) => n + (a.correct ? 1 : 0), 0)
    points.push({
      label: formatShort(start),
      start: start.getTime(),
      accuracy: inWeek.length ? correct / inWeek.length : 0,
      count: inWeek.length,
    })
  }
  return points
}

export interface DayPoint {
  key: string
  date: Date
  count: number
  correct: number
}

export function dailyActivity(state: AppState, days = 28): DayPoint[] {
  const today = startOfDay()
  const buckets = new Map<string, DayPoint>()
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i)
    buckets.set(dateKey(date), { key: dateKey(date), date, count: 0, correct: 0 })
  }
  for (const a of state.attempts) {
    const bucket = buckets.get(dateKey(new Date(a.at)))
    if (!bucket) continue
    bucket.count++
    if (a.correct) bucket.correct++
  }
  return [...buckets.values()]
}

export interface StreakInfo {
  current: number
  best: number
  studiedToday: boolean
  todayCount: number
}

export function streakInfo(state: AppState): StreakInfo {
  const days = new Set(state.studyDays)
  const today = startOfDay()
  const studiedToday = days.has(dateKey(today))

  // La racha no se rompe hasta que termina el día: si hoy aún no estudia, se cuenta desde ayer.
  let cursor = studiedToday ? today : addDays(today, -1)
  let current = 0
  while (days.has(dateKey(cursor))) {
    current++
    cursor = addDays(cursor, -1)
  }

  let best = 0
  let run = 0
  const sorted = [...days].sort()
  let prev: number | null = null
  for (const key of sorted) {
    const time = new Date(`${key}T00:00:00`).getTime()
    run = prev !== null && Math.round((time - prev) / DAY_MS) === 1 ? run + 1 : 1
    best = Math.max(best, run)
    prev = time
  }

  const todayKey = dateKey(today)
  const todayCount = state.attempts.filter((a) => dateKey(new Date(a.at)) === todayKey).length

  return { current, best: Math.max(best, current), studiedToday, todayCount }
}

export interface GlobalStat {
  attempts: number
  correct: number
  accuracy: number
  mastered: number
  totalQuestions: number
  minutes: number
}

export function globalStats(stats: SubjectStat[], state: AppState): GlobalStat {
  const attempts = stats.reduce((n, s) => n + s.attempts, 0)
  const correct = stats.reduce((n, s) => n + s.correct, 0)
  return {
    attempts,
    correct,
    accuracy: attempts ? correct / attempts : 0,
    mastered: stats.reduce((n, s) => n + s.mastered, 0),
    totalQuestions: stats.reduce((n, s) => n + s.total, 0),
    minutes: Math.round(state.attempts.reduce((n, a) => n + a.ms, 0) / 60000),
  }
}

export const subjectName = (id: SubjectId) => SUBJECT_BY_ID[id].name
