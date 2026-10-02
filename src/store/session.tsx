import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { Session, SessionItem, StudyMode, SubjectId } from '../types'

const KEY = 'estu:session'

/**
 * Sesión de estudio en curso. Se guarda aparte del progreso porque es efímera,
 * pero se persiste igual: si el navegador cierra la pestaña a mitad de un
 * simulacro de 90 minutos, el examen no se pierde.
 */

type Action =
  | { type: 'start'; session: Session }
  | { type: 'answer'; index: number; chosen: number; correct: boolean }
  | { type: 'add-time'; index: number; ms: number }
  | { type: 'goto'; index: number }
  | { type: 'append'; qid: string }
  | { type: 'clear' }

function reducer(session: Session | null, action: Action): Session | null {
  switch (action.type) {
    case 'start':
      return action.session
    case 'clear':
      return null
    default:
      break
  }
  if (!session) return null

  switch (action.type) {
    case 'answer': {
      const items = session.items.map((item, i) =>
        i === action.index ? { ...item, answered: true, chosen: action.chosen, correct: action.correct } : item,
      )
      return { ...session, items }
    }
    case 'add-time': {
      const items = session.items.map((item, i) =>
        i === action.index ? { ...item, ms: item.ms + action.ms } : item,
      )
      return { ...session, items }
    }
    case 'goto':
      return { ...session, index: Math.max(0, Math.min(session.items.length - 1, action.index)) }
    case 'append':
      return {
        ...session,
        items: [...session.items, { qid: action.qid, answered: false, chosen: null, correct: false, ms: 0 }],
      }
    default:
      return session
  }
}

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Session
    if (!parsed?.items?.length) return null
    // Un simulacro cuyo tiempo ya expiró hace rato no se retoma.
    if (parsed.endsAt && parsed.endsAt < Date.now() - 60 * 60 * 1000) return null
    return parsed
  } catch {
    return null
  }
}

export interface StartOptions {
  mode: StudyMode
  qids: string[]
  subject?: SubjectId | 'mixto'
  topic?: string
  /** Minutos de límite; solo en simulacro. */
  minutes?: number
}

interface SessionContextValue {
  session: Session | null
  start: (opts: StartOptions) => void
  answer: (index: number, chosen: number, correct: boolean) => void
  addTime: (index: number, ms: number) => void
  goto: (index: number) => void
  append: (qid: string) => void
  clear: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(reducer, null, loadSession)

  useEffect(() => {
    try {
      if (session) localStorage.setItem(KEY, JSON.stringify(session))
      else localStorage.removeItem(KEY)
    } catch {
      /* sin almacenamiento la sesión sigue viva en memoria */
    }
  }, [session])

  const start = useCallback((opts: StartOptions) => {
    const items: SessionItem[] = opts.qids.map((qid) => ({
      qid,
      answered: false,
      chosen: null,
      correct: false,
      ms: 0,
    }))
    dispatch({
      type: 'start',
      session: {
        mode: opts.mode,
        items,
        index: 0,
        startedAt: Date.now(),
        endsAt: opts.minutes ? Date.now() + opts.minutes * 60_000 : undefined,
        subject: opts.subject,
        topic: opts.topic,
      },
    })
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      start,
      answer: (index, chosen, correct) => dispatch({ type: 'answer', index, chosen, correct }),
      addTime: (index, ms) => dispatch({ type: 'add-time', index, ms }),
      goto: (index) => dispatch({ type: 'goto', index }),
      append: (qid) => dispatch({ type: 'append', qid }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [session, start],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession debe usarse dentro de <SessionProvider>')
  return ctx
}
