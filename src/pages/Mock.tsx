import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/app'
import { useSession } from '../store/session'
import { mockComposition, pickMock } from '../lib/selection'
import { QUESTIONS } from '../data/questions'
import { Card, SectionTitle, StatTile } from '../components/ui'
import { IconClock, IconPlay } from '../components/icons'
import { formatShort } from '../lib/date'

const QUESTION_OPTIONS = [30, 40, 60, 80]
const MINUTE_OPTIONS = [45, 60, 90, 120]

export default function MockPage() {
  const navigate = useNavigate()
  const { state, updateSettings } = useApp()
  const { start } = useSession()
  const { mockQuestions, mockMinutes } = state.settings

  const composition = useMemo(() => mockComposition(mockQuestions), [mockQuestions])
  const best = state.mocks.reduce((max, m) => Math.max(max, m.total ? (m.correct / m.total) * 100 : 0), 0)
  const last = state.mocks[state.mocks.length - 1]

  const begin = () => {
    const questions = pickMock(state, Math.min(mockQuestions, QUESTIONS.length))
    if (!questions.length) return
    start({
      mode: 'simulacro',
      qids: questions.map((q) => q.id),
      subject: 'mixto',
      minutes: mockMinutes,
    })
    navigate('/sesion')
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Simulacro</h1>
        <p className="mt-1 text-sm text-muted">
          Examen completo y cronometrado, con la mezcla de materias ponderada para Zootecnia. Sin
          corrección durante la prueba: la nota llega al entregar, como en el examen real.
        </p>
      </div>

      {state.mocks.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <StatTile label="Simulacros" value={state.mocks.length} />
          <StatTile label="Mejor nota" value={`${Math.round(best)}%`} tone="ok" />
          <StatTile
            label="Último"
            value={last ? `${Math.round((last.correct / last.total) * 100)}%` : '—'}
            sub={last ? formatShort(new Date(last.at)) : undefined}
          />
        </div>
      )}

      <Card className="space-y-4">
        <div>
          <span className="label">Preguntas</span>
          <div className="flex flex-wrap gap-2">
            {QUESTION_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateSettings({ mockQuestions: n })}
                className={`chip border tabular-nums transition ${
                  mockQuestions === n
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface text-muted'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="label">Duración</span>
          <div className="flex flex-wrap gap-2">
            {MINUTE_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateSettings({ mockMinutes: n })}
                className={`chip border tabular-nums transition ${
                  mockMinutes === n
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface text-muted'
                }`}
              >
                {n} min
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Son {Math.round((mockMinutes * 60) / mockQuestions)} segundos por pregunta. El estándar de
            referencia es 60 preguntas en 90 minutos.
          </p>
        </div>

        <button type="button" onClick={begin} className="btn-primary w-full">
          <IconPlay width={16} height={16} />
          Empezar simulacro
        </button>
      </Card>

      <section>
        <SectionTitle title="Composición del examen" hint="Según la ponderación configurada para Zootecnia" />
        <Card className="divide-y divide-line p-0">
          {composition.map(({ subject, count }) => (
            <div key={subject.id} className="flex items-center gap-3 p-3">
              <span className="text-lg">{subject.emoji}</span>
              <span className="flex-1 text-sm font-medium">{subject.name}</span>
              <span className="text-xs text-muted">{subject.weight} %</span>
              <span className="w-16 text-right text-sm font-bold tabular-nums">{count} preg.</span>
            </div>
          ))}
        </Card>
      </section>

      {state.mocks.length > 0 && (
        <section>
          <SectionTitle title="Historial" />
          <Card className="divide-y divide-line p-0">
            {[...state.mocks]
              .reverse()
              .slice(0, 8)
              .map((mock) => {
                const pct = mock.total ? Math.round((mock.correct / mock.total) * 100) : 0
                return (
                  <div key={mock.id} className="flex items-center gap-3 p-3">
                    <IconClock width={16} height={16} className="text-muted" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{formatShort(new Date(mock.at))}</div>
                      <div className="text-xs text-muted">
                        {mock.correct} de {mock.total} · {Math.round(mock.ms / 60000)} min
                      </div>
                    </div>
                    <span
                      className={`text-lg font-bold tabular-nums ${
                        pct >= 70 ? 'text-ok' : pct >= 50 ? 'text-warn' : 'text-bad'
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                )
              })}
          </Card>
        </section>
      )}
    </div>
  )
}
