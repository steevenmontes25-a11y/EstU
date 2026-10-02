import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../store/app'
import { useSession } from '../store/session'
import { dueQuestions, pickPractice } from '../lib/selection'
import { buildPlan, blockLabel } from '../lib/plan'
import { readinessLabel } from '../lib/gamification'
import { daysUntil, formatLong, fromKey, capitalize } from '../lib/date'
import { useInstallPrompt } from '../lib/pwa'
import { SUBJECT_BY_ID } from '../data/subjects'
import { Card, ProgressBar, ProgressRing, SectionTitle } from '../components/ui'
import { IconClock, IconFlame, IconPlay, IconRepeat, IconSpark, IconTarget } from '../components/icons'

export default function Dashboard() {
  const navigate = useNavigate()
  const { state, stats, weak, readiness, streak, global } = useApp()
  const { session, start } = useSession()
  const { canInstall, install } = useInstallPrompt()

  const left = daysUntil(state.settings.examDate)
  const due = useMemo(() => dueQuestions(state), [state])
  const goalRatio = Math.min(1, streak.todayCount / Math.max(1, state.settings.dailyGoal))

  // Mismo horizonte que la página de Plan, para que "hoy" diga exactamente lo mismo en ambas.
  const today = useMemo(
    () =>
      buildPlan(stats, {
        daysLeft: Math.max(1, left),
        dailyGoal: state.settings.dailyGoal,
        mockMinutes: state.settings.mockMinutes,
        mockQuestions: state.settings.mockQuestions,
        horizon: 14,
      })[0],
    [stats, left, state.settings],
  )

  const quickPractice = () => {
    const qids = pickPractice(state, { subject: 'mixto', count: 10 }).map((q) => q.id)
    if (!qids.length) return
    start({ mode: 'practica', qids, subject: 'mixto' })
    navigate('/sesion')
  }

  const startReview = () => {
    const qids = due.slice(0, Math.max(10, state.settings.dailyGoal)).map((q) => q.id)
    if (!qids.length) return
    start({ mode: 'repaso', qids })
    navigate('/sesion')
  }

  const greeting = state.settings.name ? `Hola, ${state.settings.name}` : 'Tu preparación'

  return (
    <div className="space-y-5">
      {session && (
        <Link
          to="/sesion"
          className="card flex items-center gap-3 border-accent/40 bg-accent-soft/50 p-4 animate-fade-up"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white">
            <IconPlay width={18} height={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">Tienes una sesión sin terminar</div>
            <div className="text-xs text-muted">
              {session.mode === 'simulacro' ? 'Simulacro' : 'Práctica'} · pregunta {session.index + 1} de{' '}
              {session.items.length}
            </div>
          </div>
          <span className="text-xs font-semibold text-accent">Continuar</span>
        </Link>
      )}

      <section className="card overflow-hidden p-0">
        <div className="flex items-center gap-4 p-5">
          <ProgressRing value={readiness} size={104} stroke={10}>
            <span className="text-2xl font-black tabular-nums">{readiness}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">de 100</span>
          </ProgressRing>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{greeting}</div>
            <h1 className="mt-0.5 text-lg font-bold leading-tight">Nivel de preparación</h1>
            <p className="mt-1 text-sm text-muted">{readinessLabel(readiness)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
          <div className="p-3">
            <div className="text-lg font-bold tabular-nums">{left >= 0 ? left : 0}</div>
            <div className="text-[11px] text-muted">días al examen</div>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-center gap-1 text-lg font-bold tabular-nums">
              <IconFlame width={16} height={16} className="text-accent" />
              {streak.current}
            </div>
            <div className="text-[11px] text-muted">días de racha</div>
          </div>
          <div className="p-3">
            <div className="text-lg font-bold tabular-nums">{global.mastered}</div>
            <div className="text-[11px] text-muted">preguntas dominadas</div>
          </div>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold">Meta de hoy</h2>
          <span className="text-xs tabular-nums text-muted">
            {streak.todayCount} / {state.settings.dailyGoal} preguntas
          </span>
        </div>
        <ProgressBar value={goalRatio} className="mt-2" />
        <p className="mt-2 text-xs text-muted">
          {goalRatio >= 1
            ? '¡Meta cumplida! Todo lo que sigue es ventaja.'
            : streak.studiedToday
              ? `Te faltan ${state.settings.dailyGoal - streak.todayCount} preguntas para cerrar el día.`
              : 'Aún no estudias hoy. Una sesión corta mantiene la racha viva.'}
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={startReview}
          disabled={!due.length}
          className="card flex items-center gap-3 p-4 text-left transition enabled:hover:border-accent/50 disabled:opacity-60"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <IconRepeat width={20} height={20} />
          </span>
          <div>
            <div className="text-sm font-bold">Repaso del día</div>
            <div className="text-xs text-muted">
              {due.length ? `${due.length} preguntas pendientes` : 'Nada pendiente por ahora'}
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={quickPractice}
          className="card flex items-center gap-3 p-4 text-left transition hover:border-accent/50"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <IconSpark width={20} height={20} />
          </span>
          <div>
            <div className="text-sm font-bold">Práctica rápida</div>
            <div className="text-xs text-muted">10 preguntas con la ponderación de Zootecnia</div>
          </div>
        </button>

        <Link to="/practicar" className="card flex items-center gap-3 p-4 transition hover:border-accent/50">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-raised text-fg">
            <IconTarget width={20} height={20} />
          </span>
          <div>
            <div className="text-sm font-bold">Práctica libre</div>
            <div className="text-xs text-muted">Elige materia, tema y cantidad</div>
          </div>
        </Link>

        <Link to="/simulacro" className="card flex items-center gap-3 p-4 transition hover:border-accent/50">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-raised text-fg">
            <IconClock width={20} height={20} />
          </span>
          <div>
            <div className="text-sm font-bold">Simulacro</div>
            <div className="text-xs text-muted">
              {state.settings.mockQuestions} preguntas en {state.settings.mockMinutes} min
            </div>
          </div>
        </Link>
      </section>

      {today && (
        <section>
          <SectionTitle
            title="Plan de hoy"
            hint={capitalize(formatLong(fromKey(today.key)))}
            action={
              <Link to="/plan" className="text-xs font-semibold text-accent">
                Ver todo
              </Link>
            }
          />
          <Card className="divide-y divide-line p-0">
            {today.blocks.map((block, i) => {
              const subject = block.subject ? SUBJECT_BY_ID[block.subject] : null
              return (
                <div key={i} className="flex items-center gap-3 p-3.5">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base"
                    style={{
                      background: subject ? `${subject.hex}1f` : 'rgb(var(--c-raised))',
                    }}
                  >
                    {subject ? subject.emoji : block.kind === 'simulacro' ? '⏱️' : '🔁'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">
                      {subject ? subject.name : blockLabel[block.kind]}
                    </div>
                    <div className="text-xs text-muted">
                      {block.questions} preguntas · ~{block.minutes} min
                      {subject && block.kind === 'practica' ? ' · práctica' : ''}
                    </div>
                  </div>
                </div>
              )
            })}
          </Card>
        </section>
      )}

      {weak.length > 0 && global.attempts > 0 && (
        <section>
          <SectionTitle title="Materias por reforzar" hint="Ordenadas por impacto en tu puntaje final" />
          <div className="space-y-2">
            {weak.slice(0, 3).map((subject) => (
              <Link
                key={subject.id}
                to={`/practicar?materia=${subject.id}`}
                className="card flex items-center gap-3 p-3.5 transition hover:border-accent/50"
              >
                <span className="text-xl">{subject.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{subject.name}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted">{subject.score}/100</span>
                  </div>
                  <ProgressBar value={subject.score / 100} color={subject.hex} className="mt-1.5" height={6} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {canInstall && (
        <button
          type="button"
          onClick={install}
          className="card w-full p-4 text-left transition hover:border-accent/50"
        >
          <div className="text-sm font-bold">Instala EstU en tu celular</div>
          <div className="mt-0.5 text-xs text-muted">
            Se abre como una app, funciona sin internet y tu progreso queda en el dispositivo.
          </div>
        </button>
      )}
    </div>
  )
}
