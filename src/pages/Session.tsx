import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../store/session'
import { useApp } from '../store/app'
import { QUESTION_BY_ID } from '../data/questions'
import { SUBJECT_BY_ID } from '../data/subjects'
import QuestionCard from '../components/QuestionCard'
import { ProgressBar } from '../components/ui'
import { IconCheck, IconClock, IconLeft, IconRight, IconX } from '../components/icons'
import { formatDuration } from '../lib/date'
import type { MockResult } from '../types'

export interface SessionSummary {
  mode: 'practica' | 'repaso' | 'simulacro'
  total: number
  correct: number
  ms: number
  bySubject: Record<string, { total: number; correct: number }>
  items: { qid: string; chosen: number | null; correct: boolean }[]
}

export default function SessionPage() {
  const navigate = useNavigate()
  const { session, answer, addTime, goto, append, clear } = useSession()
  const { answer: record, finishMock } = useApp()

  const [revealed, setRevealed] = useState(false)
  const [confirmExit, setConfirmExit] = useState(false)
  const [now, setNow] = useState(Date.now())
  const enteredAt = useRef(Date.now())
  const repeated = useRef(new Set<string>())

  const isMock = session?.mode === 'simulacro'
  const index = session?.index ?? 0
  const item = session?.items[index]
  const question = item ? QUESTION_BY_ID[item.qid] : undefined

  // Al cambiar de pregunta se contabiliza el tiempo de la anterior y se reinicia el reloj.
  useEffect(() => {
    enteredAt.current = Date.now()
    setRevealed(isMock ? false : !!item?.answered)
  }, [index, isMock, item?.answered])

  // Reloj del simulacro.
  useEffect(() => {
    if (!isMock) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [isMock])

  const summarize = useCallback((): SessionSummary => {
    if (!session) throw new Error('sin sesión')
    const bySubject: Record<string, { total: number; correct: number }> = {}
    let correct = 0
    let ms = 0
    for (const it of session.items) {
      const q = QUESTION_BY_ID[it.qid]
      if (!q) continue
      const bucket = (bySubject[q.subject] ??= { total: 0, correct: 0 })
      bucket.total++
      if (it.correct) {
        bucket.correct++
        correct++
      }
      ms += it.ms
    }
    return {
      mode: session.mode,
      total: session.items.length,
      correct,
      // En el simulacro lo que importa es el tiempo real de examen, no la suma por pregunta.
      ms: session.mode === 'simulacro' ? Date.now() - session.startedAt : ms || Date.now() - session.startedAt,
      bySubject,
      items: session.items.map((it) => ({ qid: it.qid, chosen: it.chosen, correct: it.correct })),
    }
  }, [session])

  const finish = useCallback(() => {
    if (!session) return
    const summary = summarize()

    if (session.mode === 'simulacro') {
      // En el simulacro no hay corrección inmediata: el progreso se registra al entregar.
      for (const it of session.items) {
        const q = QUESTION_BY_ID[it.qid]
        if (!q || !it.answered) continue
        record(q, it.correct, it.ms || 30_000, 'simulacro')
      }
      const result: MockResult = {
        id: `mock-${session.startedAt}`,
        at: Date.now(),
        ms: Date.now() - session.startedAt,
        total: summary.total,
        correct: summary.correct,
        bySubject: summary.bySubject,
      }
      finishMock(result)
    }

    clear()
    navigate('/resultado', { replace: true, state: summary })
  }, [session, summarize, record, finishMock, clear, navigate])

  // Se acabó el tiempo del simulacro: se entrega automáticamente.
  const timeLeft = session?.endsAt ? session.endsAt - now : 0
  useEffect(() => {
    if (isMock && session?.endsAt && timeLeft <= 0) finish()
  }, [isMock, session?.endsAt, timeLeft, finish])

  const choose = useCallback(
    (choice: number) => {
      if (!session || !item || !question) return
      const elapsed = Date.now() - enteredAt.current
      const correct = choice === question.answer

      if (isMock) {
        // Se puede cambiar la respuesta hasta entregar; el tiempo se acumula igual.
        addTime(index, elapsed)
        enteredAt.current = Date.now()
        answer(index, choice, correct)
        return
      }

      if (item.answered) return
      addTime(index, elapsed)
      answer(index, choice, correct)
      record(question, correct, elapsed, session.mode)
      setRevealed(true)

      // Lo fallado vuelve al final de la misma sesión, además de adelantarse en el
      // calendario de repetición espaciada.
      if (!correct && !repeated.current.has(item.qid)) {
        repeated.current.add(item.qid)
        append(item.qid)
      }
    },
    [session, item, question, isMock, index, addTime, answer, record, append],
  )

  const goNext = useCallback(() => {
    if (!session) return
    if (index >= session.items.length - 1) {
      if (isMock) return
      finish()
      return
    }
    addTime(index, Date.now() - enteredAt.current)
    goto(index + 1)
  }, [session, index, isMock, addTime, goto, finish])

  const goPrev = useCallback(() => {
    if (!session || index === 0) return
    addTime(index, Date.now() - enteredAt.current)
    goto(index - 1)
  }, [session, index, addTime, goto])

  // Atajos de teclado para practicar rápido desde el computador.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (['1', '2', '3', '4'].includes(e.key)) choose(Number(e.key) - 1)
      else if (e.key === 'Enter' || e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, goNext, goPrev])

  const answeredCount = useMemo(
    () => session?.items.filter((it) => it.answered).length ?? 0,
    [session],
  )

  useEffect(() => {
    if (!session) navigate('/practicar', { replace: true })
  }, [session, navigate])

  if (!session || !item || !question) return null

  const lastQuestion = index === session.items.length - 1
  const urgent = isMock && timeLeft < 5 * 60_000

  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto w-full max-w-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmExit(true)}
              className="grid h-8 w-8 place-items-center rounded-xl text-muted transition hover:bg-raised hover:text-fg"
              aria-label="Salir de la sesión"
            >
              <IconX width={18} height={18} />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs font-medium text-muted">
                <span className="truncate">
                  {isMock
                    ? 'Simulacro'
                    : session.mode === 'repaso'
                      ? 'Repaso espaciado'
                      : session.subject && session.subject !== 'mixto'
                        ? SUBJECT_BY_ID[session.subject].name
                        : 'Práctica mixta'}
                </span>
                <span className="tabular-nums">
                  {index + 1} / {session.items.length}
                </span>
              </div>
              <ProgressBar
                value={(index + (item.answered ? 1 : 0)) / session.items.length}
                className="mt-1.5"
                height={5}
              />
            </div>

            {isMock && (
              <span
                className={`chip tabular-nums font-bold ${urgent ? 'bg-bad/10 text-bad' : 'bg-raised text-muted'}`}
              >
                <IconClock width={14} height={14} />
                {formatDuration(Math.max(0, timeLeft))}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5">
        <QuestionCard
          question={question}
          chosen={item.chosen}
          revealed={revealed}
          onChoose={choose}
          showSubject={isMock || session.subject === 'mixto' || session.mode === 'repaso'}
        />

        {isMock && (
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Preguntas ({answeredCount} respondidas)
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {session.items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    addTime(index, Date.now() - enteredAt.current)
                    goto(i)
                  }}
                  className={`aspect-square rounded-lg text-[11px] font-semibold tabular-nums transition ${
                    i === index
                      ? 'bg-accent text-white'
                      : it.answered
                        ? 'bg-accent-soft text-accent'
                        : 'bg-raised text-muted hover:bg-line'
                  }`}
                  aria-label={`Ir a la pregunta ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="sticky bottom-0 border-t border-line bg-surface/95 backdrop-blur-md">
        <div
          className="mx-auto flex w-full max-w-2xl items-center gap-2 px-4 py-3"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          {isMock ? (
            <>
              <button type="button" onClick={goPrev} disabled={index === 0} className="btn-ghost">
                <IconLeft width={16} height={16} />
                Anterior
              </button>
              {lastQuestion ? (
                <button type="button" onClick={finish} className="btn-primary flex-1">
                  <IconCheck width={16} height={16} />
                  Entregar examen
                </button>
              ) : (
                <button type="button" onClick={goNext} className="btn-primary flex-1">
                  Siguiente
                  <IconRight width={16} height={16} />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!item.answered}
              className="btn-primary w-full"
            >
              {item.answered
                ? lastQuestion
                  ? 'Ver resultados'
                  : 'Siguiente pregunta'
                : 'Elige una respuesta'}
              {item.answered && !lastQuestion && <IconRight width={16} height={16} />}
            </button>
          )}
        </div>
      </footer>

      {confirmExit && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4">
          <div className="card w-full max-w-sm animate-slide-in p-5">
            <h3 className="font-bold">¿Salir de la sesión?</h3>
            <p className="mt-1 text-sm text-muted">
              {isMock
                ? 'El simulacro quedará sin entregar y no contará en tus estadísticas.'
                : 'Las respuestas que ya diste quedan guardadas en tu progreso.'}
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-ghost flex-1" onClick={() => setConfirmExit(false)}>
                Seguir estudiando
              </button>
              <button
                type="button"
                className="btn-outline flex-1"
                onClick={() => {
                  clear()
                  navigate('/', { replace: true })
                }}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
