export type SubjectId =
  | 'biologia'
  | 'quimica'
  | 'matematicas'
  | 'fisica'
  | 'lengua'
  | 'historia'
  | 'emprendimiento'

export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface Question {
  id: string
  subject: SubjectId
  topic: string
  difficulty: Difficulty
  prompt: string
  options: [string, string, string, string]
  /** Indice de la opcion correcta dentro de `options`. */
  answer: 0 | 1 | 2 | 3
  explanation: string
}

export interface Subject {
  id: SubjectId
  name: string
  short: string
  /** Peso porcentual en simulacros y en el nivel de preparacion. Suma 100. */
  weight: number
  /** Clases Tailwind del acento de la materia. */
  accent: string
  hex: string
  emoji: string
  blurb: string
}

export type StudyMode = 'practica' | 'repaso' | 'simulacro'

/** Estado SM-2 de una pregunta. */
export interface CardState {
  ef: number
  /** Intervalo en dias hasta la siguiente revision. */
  interval: number
  reps: number
  /** Timestamp de la proxima revision. */
  due: number
  lapses: number
  seen: number
  correct: number
  /** Aciertos consecutivos. */
  streak: number
  lastSeen: number
}

export interface Attempt {
  qid: string
  subject: SubjectId
  correct: boolean
  ms: number
  at: number
  mode: StudyMode
}

export interface MockResult {
  id: string
  at: number
  /** Duracion real empleada, en ms. */
  ms: number
  total: number
  correct: number
  bySubject: Record<string, { total: number; correct: number }>
}

export interface Settings {
  /** Fecha estimada del examen en formato YYYY-MM-DD. */
  examDate: string
  /** Meta diaria de preguntas. */
  dailyGoal: number
  reminderEnabled: boolean
  /** Hora del recordatorio, formato HH:MM. */
  reminderTime: string
  /** Duracion del simulacro en minutos. */
  mockMinutes: number
  /** Numero de preguntas del simulacro. */
  mockQuestions: number
  name: string
}

export interface AppState {
  version: number
  settings: Settings
  cards: Record<string, CardState>
  attempts: Attempt[]
  mocks: MockResult[]
  /** Dias con actividad, en formato YYYY-MM-DD. */
  studyDays: string[]
  badges: Record<string, number>
  /** Fecha en que se genero el plan vigente. */
  planGeneratedOn?: string
  createdAt: number
}

/** Una pregunta dentro de una sesion activa. */
export interface SessionItem {
  qid: string
  answered: boolean
  chosen: number | null
  correct: boolean
  ms: number
}

export interface Session {
  mode: StudyMode
  items: SessionItem[]
  index: number
  startedAt: number
  /** Solo en simulacro: timestamp en el que se acaba el tiempo. */
  endsAt?: number
  subject?: SubjectId | 'mixto'
  topic?: string
}
