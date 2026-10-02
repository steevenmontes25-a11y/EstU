import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/app'
import { useSession } from '../store/session'
import { blockLabel, buildPlan, type PlanBlock } from '../lib/plan'
import { pickPractice, pickReview } from '../lib/selection'
import { SUBJECT_BY_ID } from '../data/subjects'
import { capitalize, daysUntil, formatLong, fromKey } from '../lib/date'
import { Card, SectionTitle } from '../components/ui'
import { IconPlay } from '../components/icons'

export default function PlanPage() {
  const navigate = useNavigate()
  const { state, stats, updateSettings } = useApp()
  const { start } = useSession()

  const left = daysUntil(state.settings.examDate)
  const plan = useMemo(
    () =>
      buildPlan(stats, {
        daysLeft: Math.max(1, left),
        dailyGoal: state.settings.dailyGoal,
        mockMinutes: state.settings.mockMinutes,
        mockQuestions: state.settings.mockQuestions,
        horizon: 14,
      }),
    [stats, left, state.settings],
  )

  const runBlock = (block: PlanBlock) => {
    if (block.kind === 'simulacro') {
      navigate('/simulacro')
      return
    }
    if (block.kind === 'repaso') {
      const qids = pickReview(state, block.questions).map((q) => q.id)
      if (!qids.length) return
      start({ mode: 'repaso', qids })
      navigate('/sesion')
      return
    }
    const questions = pickPractice(state, { subject: block.subject, count: block.questions })
    if (!questions.length) return
    start({ mode: 'practica', qids: questions.map((q) => q.id), subject: block.subject })
    navigate('/sesion')
  }

  const totalQuestions = plan.reduce((n, d) => n + d.questions, 0)
  const totalHours = Math.round(plan.reduce((n, d) => n + d.minutes, 0) / 60)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">Plan de estudio</h1>

      <Card className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {left >= 0 ? 'Faltan' : 'La fecha estimada ya pasó'}
        </div>
        <div className="mt-1 text-5xl font-black tabular-nums text-accent">{Math.max(0, left)}</div>
        <div className="text-sm font-medium">{left === 1 ? 'día' : 'días'} para el examen</div>
        <div className="mt-2 text-xs text-muted">
          {capitalize(formatLong(fromKey(state.settings.examDate)))}
        </div>

        <label className="mt-4 block text-left">
          <span className="label">Fecha estimada del examen</span>
          <input
            type="date"
            className="field"
            value={state.settings.examDate}
            onChange={(e) => updateSettings({ examDate: e.target.value })}
          />
        </label>
        <p className="mt-2 text-left text-xs text-muted">
          Ajústala cuando ESPOCH o UTM confirmen la convocatoria. El plan se redistribuye solo.
        </p>
      </Card>

      <SectionTitle
        title="Próximos 14 días"
        hint={`${totalQuestions} preguntas · unas ${totalHours} horas de estudio`}
      />

      <div className="space-y-3">
        {plan.map((day) => (
          <Card key={day.key} className={`p-0 ${day.isToday ? 'border-accent/50' : ''}`}>
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-xl bg-raised leading-none">
                <span className="text-[9px] uppercase text-muted">{day.weekday}</span>
                <span className="text-xs font-bold tabular-nums">{day.date.getDate()}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">
                  {day.isToday ? 'Hoy' : capitalize(formatLong(day.date))}
                </div>
                <div className="text-[11px] text-muted">
                  {day.questions} preguntas · ~{day.minutes} min
                </div>
              </div>
            </div>

            <div className="divide-y divide-line">
              {day.blocks.map((block, i) => {
                const subject = block.subject ? SUBJECT_BY_ID[block.subject] : null
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm"
                      style={{ background: subject ? `${subject.hex}1f` : 'rgb(var(--c-raised))' }}
                    >
                      {subject ? subject.emoji : block.kind === 'simulacro' ? '⏱️' : '🔁'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {subject ? subject.name : blockLabel[block.kind]}
                      </div>
                      <div className="text-[11px] text-muted">
                        {block.questions} preguntas · ~{block.minutes} min
                      </div>
                    </div>
                    {day.isToday && (
                      <button
                        type="button"
                        onClick={() => runBlock(block)}
                        className="btn-ghost px-3 py-1.5 text-xs"
                      >
                        <IconPlay width={13} height={13} />
                        Empezar
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <p className="pb-2 text-center text-xs text-muted">
        El plan reparte más tiempo a las materias con menor nivel de preparación y mayor peso en el
        examen, e intercala un simulacro cada siete días.
      </p>
    </div>
  )
}
