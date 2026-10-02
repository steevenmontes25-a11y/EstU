import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { SessionSummary } from './Session'
import { QUESTION_BY_ID } from '../data/questions'
import { SUBJECT_BY_ID } from '../data/subjects'
import { useSession } from '../store/session'
import { ProgressRing, SectionTitle } from '../components/ui'
import { SubjectBar } from '../components/charts'
import { IconRepeat, IconHome } from '../components/icons'
import { formatLength } from '../lib/date'

const LETTERS = ['A', 'B', 'C', 'D']

function verdict(pct: number, mode: SessionSummary['mode']): { title: string; text: string } {
  if (mode === 'simulacro') {
    if (pct >= 80) return { title: '¡Excelente!', text: 'Con este puntaje estás en rango competitivo. Mantén el ritmo.' }
    if (pct >= 60) return { title: 'Buen resultado', text: 'Vas bien. Refuerza las materias con menor porcentaje.' }
    if (pct >= 40) return { title: 'Hay base', text: 'Ya reconoces los temas. Toca profundizar en los que fallaste.' }
    return { title: 'A construir', text: 'Es apenas un diagnóstico. Empieza por Biología y Química, que pesan más.' }
  }
  if (pct >= 90) return { title: '¡Dominado!', text: 'Estas preguntas se espaciarán bastante antes de volver.' }
  if (pct >= 70) return { title: 'Buena sesión', text: 'Lo que fallaste volverá pronto para afianzarlo.' }
  if (pct >= 40) return { title: 'Sesión útil', text: 'Los errores de hoy son el material de repaso de mañana.' }
  return { title: 'Tema por reforzar', text: 'Revisa los apuntes de esta materia antes de volver a practicar.' }
}

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { start } = useSession()
  const summary = location.state as SessionSummary | null

  useEffect(() => {
    if (!summary) navigate('/', { replace: true })
  }, [summary, navigate])

  if (!summary) return null

  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 0
  const { title, text } = verdict(pct, summary.mode)
  const failed = summary.items.filter((i) => !i.correct)
  // En un simulacro conviene distinguir lo que se falló de lo que quedó en blanco.
  const wrong = failed.filter((i) => i.chosen !== null)
  const blank = failed.length - wrong.length
  const REVIEW_LIMIT = 25
  const shown = wrong.slice(0, REVIEW_LIMIT)

  const retryFailed = () => {
    if (!failed.length) return
    start({ mode: 'practica', qids: failed.map((f) => f.qid), subject: 'mixto' })
    navigate('/sesion', { replace: true })
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-6">
      <section className="card animate-pop p-6 text-center">
        <ProgressRing value={pct} size={140} stroke={12}>
          <span className="text-3xl font-black tabular-nums">{pct}%</span>
          <span className="text-xs text-muted">
            {summary.correct} de {summary.total}
          </span>
        </ProgressRing>
        <h1 className="mt-4 text-xl font-bold">{title}</h1>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{text}</p>
        <p className="mt-3 text-xs text-muted">
          {summary.mode === 'simulacro' ? 'Simulacro completo' : 'Sesión de práctica'} ·{' '}
          {formatLength(summary.ms)}
        </p>
      </section>

      {Object.keys(summary.bySubject).length > 1 && (
        <section className="card p-4">
          <SectionTitle title="Por materia" />
          <div className="divide-y divide-line">
            {Object.entries(summary.bySubject)
              .sort((a, b) => b[1].total - a[1].total)
              .map(([id, data]) => {
                const subject = SUBJECT_BY_ID[id as keyof typeof SUBJECT_BY_ID]
                return (
                  <SubjectBar
                    key={id}
                    label={`${subject.emoji} ${subject.name}`}
                    value={data.total ? data.correct / data.total : 0}
                    detail={`${data.correct}/${data.total}`}
                    color={subject.hex}
                  />
                )
              })}
          </div>
        </section>
      )}

      {blank > 0 && (
        <p className="text-center text-xs text-muted">
          Dejaste {blank} {blank === 1 ? 'pregunta' : 'preguntas'} sin responder. En el examen real
          conviene marcar siempre una opción.
        </p>
      )}

      {shown.length > 0 && (
        <section>
          <SectionTitle
            title={`Para repasar (${wrong.length})`}
            hint="Vuelve a leer la explicación: es donde más se aprende."
          />
          <ul className="space-y-3">
            {shown.map((f) => {
              const q = QUESTION_BY_ID[f.qid]
              if (!q) return null
              const subject = SUBJECT_BY_ID[q.subject]
              return (
                <li key={f.qid} className="card p-4">
                  <span className="chip mb-2" style={{ background: `${subject.hex}1f`, color: subject.hex }}>
                    {subject.emoji} {subject.name}
                  </span>
                  <p className="text-sm font-semibold leading-snug">{q.prompt}</p>
                  {f.chosen !== null && (
                    <p className="mt-2 text-xs text-bad">
                      Marcaste {LETTERS[f.chosen]}: {q.options[f.chosen]}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-ok">
                    Correcta {LETTERS[q.answer]}: {q.options[q.answer]}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{q.explanation}</p>
                </li>
              )
            })}
          </ul>
          {wrong.length > REVIEW_LIMIT && (
            <p className="mt-3 text-center text-xs text-muted">
              Y {wrong.length - REVIEW_LIMIT} más. Repítelas abajo para verlas una por una.
            </p>
          )}
        </section>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        {failed.length > 0 && (
          <button type="button" onClick={retryFailed} className="btn-primary flex-1">
            <IconRepeat width={16} height={16} />
            Practicar las {failed.length} que no acertaste
          </button>
        )}
        <Link to="/" className="btn-outline flex-1">
          <IconHome width={16} height={16} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
