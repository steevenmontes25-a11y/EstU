import type { Question, SubjectId } from '../../types'
import { biologia } from './biologia'
import { quimica } from './quimica'
import { matematicas } from './matematicas'
import { fisica } from './fisica'
import { lengua } from './lengua'
import { historia } from './historia'
import { emprendimiento } from './emprendimiento'

export const QUESTIONS: Question[] = [
  ...biologia,
  ...quimica,
  ...matematicas,
  ...fisica,
  ...lengua,
  ...historia,
  ...emprendimiento,
]

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
)

export const QUESTIONS_BY_SUBJECT = QUESTIONS.reduce<Record<string, Question[]>>((acc, q) => {
  ;(acc[q.subject] ||= []).push(q)
  return acc
}, {})

export const bySubject = (subject: SubjectId): Question[] => QUESTIONS_BY_SUBJECT[subject] ?? []

/** Temas disponibles dentro de una materia, en el orden en que aparecen en el banco. */
export const topicsOf = (subject: SubjectId): string[] => [...new Set(bySubject(subject).map((q) => q.topic))]

if (import.meta.env.DEV) {
  const seen = new Set<string>()
  for (const q of QUESTIONS) {
    if (seen.has(q.id)) console.error(`[banco] id duplicado: ${q.id}`)
    seen.add(q.id)
    if (q.options.length !== 4) console.error(`[banco] ${q.id} no tiene 4 opciones`)
    if (q.answer < 0 || q.answer > 3) console.error(`[banco] ${q.id} tiene una respuesta fuera de rango`)
    if (new Set(q.options).size !== 4) console.error(`[banco] ${q.id} tiene opciones repetidas`)
  }
}
