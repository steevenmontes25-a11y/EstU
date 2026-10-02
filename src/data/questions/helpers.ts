import type { Question, SubjectId } from '../../types'

/** Una pregunta tal como se escribe en el banco: la materia la pone `build`. */
export type QDraft = Omit<Question, 'subject'>

export const build = (subject: SubjectId, drafts: QDraft[]): Question[] =>
  drafts.map((d) => ({ ...d, subject }))
