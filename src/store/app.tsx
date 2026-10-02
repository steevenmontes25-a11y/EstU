import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AppState, MockResult, Question, Settings, StudyMode } from '../types'
import { initialState, loadState, saveState } from '../lib/storage'
import { newCard, review } from '../lib/sm2'
import { dateKey } from '../lib/date'
import {
  globalStats,
  readiness as computeReadiness,
  streakInfo,
  subjectStats,
  weakSubjects,
  type GlobalStat,
  type StreakInfo,
  type SubjectStat,
  type WeakSubject,
} from '../lib/stats'
import { evaluateBadges, newlyUnlocked, type BadgeState } from '../lib/gamification'

type Action =
  | { type: 'answer'; question: Question; correct: boolean; ms: number; mode: StudyMode }
  | { type: 'finish-mock'; result: MockResult }
  | { type: 'settings'; patch: Partial<Settings> }
  | { type: 'record-badges'; ids: string[] }
  | { type: 'replace'; state: AppState }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'answer': {
      const { question, correct, ms, mode } = action
      const now = Date.now()
      const card = state.cards[question.id] ?? newCard(now)
      const today = dateKey(new Date(now))
      return {
        ...state,
        cards: { ...state.cards, [question.id]: review(card, correct, ms, now) },
        attempts: [...state.attempts, { qid: question.id, subject: question.subject, correct, ms, at: now, mode }],
        studyDays: state.studyDays.includes(today) ? state.studyDays : [...state.studyDays, today],
      }
    }
    case 'finish-mock':
      return { ...state, mocks: [...state.mocks, action.result] }
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } }
    case 'record-badges': {
      const badges = { ...state.badges }
      const now = Date.now()
      for (const id of action.ids) badges[id] ??= now
      return { ...state, badges }
    }
    case 'replace':
      return action.state
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  stats: SubjectStat[]
  weak: WeakSubject[]
  readiness: number
  streak: StreakInfo
  global: GlobalStat
  badges: BadgeState[]
  /** Insignias desbloqueadas en esta sesión, para celebrarlas una sola vez. */
  celebrations: BadgeState[]
  dismissCelebration: (id: string) => void
  answer: (question: Question, correct: boolean, ms: number, mode: StudyMode) => void
  finishMock: (result: MockResult) => void
  updateSettings: (patch: Partial<Settings>) => void
  replaceState: (state: AppState) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const [celebrations, setCelebrations] = useState<BadgeState[]>([])
  const firstRender = useRef(true)

  useEffect(() => {
    saveState(state)
  }, [state])

  const stats = useMemo(() => subjectStats(state), [state])
  const readiness = useMemo(() => computeReadiness(stats), [stats])
  const streak = useMemo(() => streakInfo(state), [state])
  const global = useMemo(() => globalStats(stats, state), [stats, state])
  const weak = useMemo(() => weakSubjects(stats), [stats])
  const badges = useMemo(
    () => evaluateBadges({ state, stats, streak, global, readiness }),
    [state, stats, streak, global, readiness],
  )

  // Las insignias ya conseguidas se registran; las nuevas se celebran, salvo en la
  // primera carga (ahí solo se sincroniza lo que ya estaba logrado).
  useEffect(() => {
    const fresh = newlyUnlocked(badges, state.badges)
    if (!fresh.length) {
      firstRender.current = false
      return
    }
    dispatch({ type: 'record-badges', ids: fresh.map((b) => b.id) })
    if (!firstRender.current) setCelebrations((prev) => [...prev, ...fresh])
    firstRender.current = false
  }, [badges, state.badges])

  const value: AppContextValue = {
    state,
    stats,
    weak,
    readiness,
    streak,
    global,
    badges,
    celebrations,
    dismissCelebration: useCallback((id: string) => {
      setCelebrations((prev) => prev.filter((b) => b.id !== id))
    }, []),
    answer: useCallback((question, correct, ms, mode) => {
      dispatch({ type: 'answer', question, correct, ms, mode })
    }, []),
    finishMock: useCallback((result) => dispatch({ type: 'finish-mock', result }), []),
    updateSettings: useCallback((patch) => dispatch({ type: 'settings', patch }), []),
    replaceState: useCallback((next) => dispatch({ type: 'replace', state: next }), []),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}

export { initialState }
