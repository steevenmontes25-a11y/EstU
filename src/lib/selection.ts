import type { AppState, Difficulty, Question, SubjectId } from '../types'
import { SUBJECTS } from '../data/subjects'
import { QUESTIONS, bySubject } from '../data/questions'
import { strength } from './sm2'
import { DAY_MS } from './date'

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

/**
 * Reparte `total` preguntas entre las materias según su ponderación, usando el
 * método del resto mayor para que la suma sea exacta.
 */
export function distributeByWeight(total: number, subjects = SUBJECTS): Record<SubjectId, number> {
  const totalWeight = subjects.reduce((n, s) => n + s.weight, 0) || 1
  const exact = subjects.map((s) => ({ id: s.id, value: (total * s.weight) / totalWeight }))
  const counts = {} as Record<SubjectId, number>
  let assigned = 0
  for (const item of exact) {
    counts[item.id] = Math.floor(item.value)
    assigned += counts[item.id]
  }
  const remainders = exact
    .map((item) => ({ id: item.id, rest: item.value - Math.floor(item.value) }))
    .sort((a, b) => b.rest - a.rest)
  let i = 0
  while (assigned < total && remainders.length) {
    counts[remainders[i % remainders.length]!.id]++
    assigned++
    i++
  }
  return counts
}

/**
 * Prioridad de una pregunta dentro de una sesión de práctica:
 * primero lo vencido (repetición espaciada), luego lo nunca visto y al final
 * lo ya sabido, con algo de azar para que no salga siempre el mismo orden.
 */
function priority(state: AppState, q: Question, now: number): number {
  const card = state.cards[q.id]
  if (!card || card.seen === 0) return 100 + Math.random() * 8
  if (card.due <= now) {
    const overdueDays = Math.min(30, (now - card.due) / DAY_MS)
    return 200 + overdueDays + Math.random() * 4
  }
  return 20 * (1 - strength(card)) + Math.random() * 4
}

export interface PracticeOptions {
  subject?: SubjectId | 'mixto'
  topic?: string
  difficulty?: Difficulty | 'todas'
  count: number
}

export function pickPractice(state: AppState, opts: PracticeOptions, now = Date.now()): Question[] {
  const { subject = 'mixto', topic, difficulty = 'todas', count } = opts

  let pool: Question[] =
    subject === 'mixto' ? QUESTIONS : bySubject(subject)
  if (topic) pool = pool.filter((q) => q.topic === topic)
  if (difficulty !== 'todas') pool = pool.filter((q) => q.difficulty === difficulty)
  if (!pool.length) return []

  if (subject === 'mixto') {
    // En modo mixto se respeta la ponderación: Biología y Química pesan la mitad.
    const quota = distributeByWeight(count)
    const chosen: Question[] = []
    for (const s of SUBJECTS) {
      const subPool = pool.filter((q) => q.subject === s.id)
      chosen.push(...rankAndTake(state, subPool, quota[s.id] ?? 0, now))
    }
    // Si alguna materia no tenía suficientes preguntas, se completa con el resto.
    if (chosen.length < count) {
      const taken = new Set(chosen.map((q) => q.id))
      chosen.push(...rankAndTake(state, pool.filter((q) => !taken.has(q.id)), count - chosen.length, now))
    }
    return shuffle(chosen).slice(0, count)
  }

  return rankAndTake(state, pool, count, now)
}

function rankAndTake(state: AppState, pool: Question[], count: number, now: number): Question[] {
  if (count <= 0) return []
  return [...pool]
    .map((q) => ({ q, p: priority(state, q, now) }))
    .sort((a, b) => b.p - a.p)
    .slice(0, count)
    .map((x) => x.q)
}

/** Preguntas que la repetición espaciada tiene pendientes hoy. */
export function dueQuestions(state: AppState, now = Date.now()): Question[] {
  return QUESTIONS.filter((q) => {
    const card = state.cards[q.id]
    return !!card && card.seen > 0 && card.due <= now
  }).sort((a, b) => (state.cards[a.id]!.due ?? 0) - (state.cards[b.id]!.due ?? 0))
}

export function pickReview(state: AppState, count: number, now = Date.now()): Question[] {
  const due = dueQuestions(state, now)
  if (due.length >= count) return due.slice(0, count)

  // Si no hay suficientes vencidas, se completa con las más flojas ya vistas.
  const taken = new Set(due.map((q) => q.id))
  const weakest = QUESTIONS.filter((q) => {
    const card = state.cards[q.id]
    return !taken.has(q.id) && !!card && card.seen > 0
  })
    .sort((a, b) => strength(state.cards[a.id]) - strength(state.cards[b.id]))
    .slice(0, count - due.length)

  return [...due, ...weakest]
}

/** Examen completo con la mezcla ponderada de materias. */
export function pickMock(state: AppState, total: number, now = Date.now()): Question[] {
  const quota = distributeByWeight(total)
  const chosen: Question[] = []
  for (const s of SUBJECTS) {
    const bank = shuffle(bySubject(s.id))
    const want = quota[s.id] ?? 0
    // Se prefieren preguntas menos vistas, pero sin el sesgo fuerte de la práctica:
    // un simulacro debe parecerse a un examen real.
    const ordered = bank
      .map((q) => ({ q, p: (state.cards[q.id]?.seen ?? 0) + Math.random() * 3 }))
      .sort((a, b) => a.p - b.p)
      .slice(0, want)
      .map((x) => x.q)
    chosen.push(...ordered)
  }
  if (chosen.length < total) {
    const taken = new Set(chosen.map((q) => q.id))
    chosen.push(...shuffle(QUESTIONS.filter((q) => !taken.has(q.id))).slice(0, total - chosen.length))
  }
  void now
  return shuffle(chosen)
}

/** Cuántas preguntas de cada materia entran en un simulacro, para mostrarlo antes de empezar. */
export function mockComposition(total: number) {
  const quota = distributeByWeight(total)
  return SUBJECTS.map((s) => ({ subject: s, count: quota[s.id] ?? 0 }))
}
