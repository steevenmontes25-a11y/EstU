import type { AppState, Settings } from '../types'
import { addDays, dateKey } from './date'

const KEY = 'estu:state'
const STATE_VERSION = 1

/** Fecha por defecto del examen: se confirma más adelante, así que se estima a 90 días. */
const defaultExamDate = () => dateKey(addDays(new Date(), 90))

export const defaultSettings = (): Settings => ({
  examDate: defaultExamDate(),
  dailyGoal: 20,
  reminderEnabled: false,
  reminderTime: '19:00',
  mockMinutes: 90,
  mockQuestions: 60,
  name: '',
})

export const initialState = (): AppState => ({
  version: STATE_VERSION,
  settings: defaultSettings(),
  cards: {},
  attempts: [],
  mocks: [],
  studyDays: [],
  badges: {},
  createdAt: Date.now(),
})

/** Tope de intentos guardados: suficiente para las gráficas sin inflar el localStorage. */
const MAX_ATTEMPTS = 4000

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initialState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    return migrate(parsed)
  } catch {
    // Un estado corrupto no debe dejar la app inservible: se empieza de cero.
    return initialState()
  }
}

function migrate(parsed: Partial<AppState>): AppState {
  const base = initialState()
  return {
    ...base,
    ...parsed,
    version: STATE_VERSION,
    settings: { ...base.settings, ...(parsed.settings ?? {}) },
    cards: parsed.cards ?? {},
    attempts: (parsed.attempts ?? []).slice(-MAX_ATTEMPTS),
    mocks: parsed.mocks ?? [],
    studyDays: parsed.studyDays ?? [],
    badges: parsed.badges ?? {},
  }
}

export function saveState(state: AppState): void {
  try {
    const trimmed: AppState = { ...state, attempts: state.attempts.slice(-MAX_ATTEMPTS) }
    localStorage.setItem(KEY, JSON.stringify(trimmed))
  } catch {
    // Cuota llena o modo privado: la sesión sigue funcionando en memoria.
  }
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function importState(json: string): AppState {
  return migrate(JSON.parse(json) as Partial<AppState>)
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* nada que hacer */
  }
}
