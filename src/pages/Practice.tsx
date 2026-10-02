import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { Difficulty, SubjectId } from '../types'
import { SUBJECTS, SUBJECT_BY_ID } from '../data/subjects'
import { bySubject, topicsOf, QUESTIONS } from '../data/questions'
import { pickPractice, dueQuestions } from '../lib/selection'
import { isMastered } from '../lib/sm2'
import { useApp } from '../store/app'
import { useSession } from '../store/session'
import { Card, SectionTitle } from '../components/ui'
import { IconPlay, IconRepeat } from '../components/icons'

const COUNTS = [10, 15, 20, 30]
const DIFFICULTIES: { id: Difficulty | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'facil', label: 'Fácil' },
  { id: 'medio', label: 'Medio' },
  { id: 'dificil', label: 'Difícil' },
]

export default function PracticePage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { state } = useApp()
  const { start } = useSession()

  const initial = params.get('materia') as SubjectId | null
  const [subject, setSubject] = useState<SubjectId | 'mixto'>(
    initial && SUBJECT_BY_ID[initial] ? initial : 'mixto',
  )
  const [topic, setTopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<Difficulty | 'todas'>('todas')
  const [count, setCount] = useState(10)

  const topics = useMemo(() => (subject === 'mixto' ? [] : topicsOf(subject)), [subject])

  const pool = useMemo(() => {
    let list = subject === 'mixto' ? QUESTIONS : bySubject(subject)
    if (topic) list = list.filter((q) => q.topic === topic)
    if (difficulty !== 'todas') list = list.filter((q) => q.difficulty === difficulty)
    return list
  }, [subject, topic, difficulty])

  const breakdown = useMemo(() => {
    const now = Date.now()
    let nuevas = 0
    let pendientes = 0
    let dominadas = 0
    for (const q of pool) {
      const card = state.cards[q.id]
      if (!card || card.seen === 0) nuevas++
      else if (isMastered(card)) dominadas++
      else if (card.due <= now) pendientes++
    }
    return { nuevas, pendientes, dominadas }
  }, [pool, state.cards])

  const due = useMemo(() => dueQuestions(state), [state])
  const available = Math.min(count, pool.length)

  const startPractice = () => {
    const questions = pickPractice(state, { subject, topic: topic || undefined, difficulty, count })
    if (!questions.length) return
    start({
      mode: 'practica',
      qids: questions.map((q) => q.id),
      subject,
      topic: topic || undefined,
    })
    navigate('/sesion')
  }

  const startReview = () => {
    const qids = due.slice(0, Math.max(10, state.settings.dailyGoal)).map((q) => q.id)
    if (!qids.length) return
    start({ mode: 'repaso', qids })
    navigate('/sesion')
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">Practicar</h1>

      <button
        type="button"
        onClick={startReview}
        disabled={!due.length}
        className="card flex w-full items-center gap-3 p-4 text-left transition enabled:hover:border-accent/50 disabled:opacity-60"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <IconRepeat width={20} height={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">Repaso espaciado</div>
          <div className="text-xs text-muted">
            {due.length
              ? `${due.length} preguntas te tocan hoy según el algoritmo`
              : 'Sin pendientes: vuelve mañana o practica libremente'}
          </div>
        </div>
      </button>

      <section>
        <SectionTitle title="Práctica libre" hint="Elige qué quieres trabajar y cuánto tiempo tienes" />

        <Card className="space-y-4">
          <div>
            <span className="label">Materia</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSubject('mixto')
                  setTopic('')
                }}
                className={`chip border transition ${
                  subject === 'mixto'
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface text-muted'
                }`}
              >
                🎲 Mixto ponderado
              </button>
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSubject(s.id)
                    setTopic('')
                  }}
                  className="chip border transition"
                  style={
                    subject === s.id
                      ? { borderColor: s.hex, background: `${s.hex}1f`, color: s.hex }
                      : { borderColor: 'rgb(var(--c-line))', color: 'rgb(var(--c-muted))' }
                  }
                >
                  {s.emoji} {s.short}
                </button>
              ))}
            </div>
            {subject === 'mixto' && (
              <p className="mt-2 text-xs text-muted">
                Mezcla las siete materias con el peso del examen: Biología y Química suman la mitad.
              </p>
            )}
          </div>

          {topics.length > 0 && (
            <div>
              <label className="label" htmlFor="topic">
                Tema
              </label>
              <select
                id="topic"
                className="field"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="">Todos los temas</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <span className="label">Dificultad</span>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className={`chip border transition ${
                    difficulty === d.id
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line bg-surface text-muted'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="label">Cantidad de preguntas</span>
            <div className="flex flex-wrap gap-2">
              {COUNTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={`chip border tabular-nums transition ${
                    count === c
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line bg-surface text-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-raised p-3 text-xs text-muted">
            {pool.length === 0 ? (
              'No hay preguntas con esta combinación. Prueba con otra dificultad o tema.'
            ) : (
              <>
                Disponibles: <strong className="text-fg">{pool.length}</strong> · nuevas{' '}
                <strong className="text-fg">{breakdown.nuevas}</strong> · por repasar{' '}
                <strong className="text-fg">{breakdown.pendientes}</strong> · dominadas{' '}
                <strong className="text-fg">{breakdown.dominadas}</strong>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={startPractice}
            disabled={!pool.length}
            className="btn-primary w-full"
          >
            <IconPlay width={16} height={16} />
            Empezar con {available} preguntas
          </button>
        </Card>
      </section>
    </div>
  )
}
