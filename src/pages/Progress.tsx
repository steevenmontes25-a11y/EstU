import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/app'
import { dailyActivity, weeklyEvolution } from '../lib/stats'
import { ActivityStrip, EvolutionChart } from '../components/charts'
import { Card, EmptyState, ProgressBar, SectionTitle, StatTile } from '../components/ui'
import { IconTarget, IconTrophy } from '../components/icons'

export default function ProgressPage() {
  const { state, stats, weak, global, streak, badges } = useApp()

  const weeks = useMemo(() => weeklyEvolution(state), [state])
  const days = useMemo(() => dailyActivity(state), [state])
  const unlocked = badges.filter((b) => b.unlocked)
  const pct = (v: number) => `${Math.round(v * 100)}%`

  if (global.attempts === 0) {
    return (
      <div className="space-y-5">
        <h1 className="text-xl font-bold tracking-tight">Progreso</h1>
        <EmptyState
          emoji="📊"
          title="Todavía no hay nada que medir"
          description="Responde tu primera sesión y aquí verás tu porcentaje de aciertos por materia, la evolución semana a semana y qué temas te están costando."
          action={
            <Link to="/practicar" className="btn-primary">
              <IconTarget width={16} height={16} />
              Empezar a practicar
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Progreso</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Aciertos"
          value={pct(global.accuracy)}
          sub={`${global.correct} de ${global.attempts}`}
          tone={global.accuracy >= 0.7 ? 'ok' : global.accuracy >= 0.5 ? 'warn' : 'bad'}
        />
        <StatTile label="Dominadas" value={global.mastered} sub={`de ${global.totalQuestions}`} />
        <StatTile label="Racha" value={`${streak.current} d`} sub={`mejor: ${streak.best} d`} />
        <StatTile label="Tiempo" value={`${global.minutes} min`} sub="estudiando" />
      </div>

      <section>
        <SectionTitle title="Evolución semanal" hint="Porcentaje de aciertos por semana" />
        <Card>
          <EvolutionChart points={weeks} />
        </Card>
      </section>

      <section>
        <SectionTitle title="Constancia" hint="Últimas 4 semanas de actividad" />
        <Card>
          <ActivityStrip days={days} goal={state.settings.dailyGoal} />
          <p className="mt-3 text-xs text-muted">
            Cada cuadro es un día; el color se llena según tu meta de {state.settings.dailyGoal} preguntas.
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle title="Por materia" hint="Nivel de preparación, aciertos y cobertura del banco" />
        <div className="space-y-2">
          {[...stats]
            .sort((a, b) => b.weight - a.weight)
            .map((s) => (
              <Card key={s.id} className="p-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{s.name}</span>
                      <span className="shrink-0 text-xs font-bold tabular-nums" style={{ color: s.hex }}>
                        {s.score}/100
                      </span>
                    </div>
                    <ProgressBar value={s.score / 100} color={s.hex} className="mt-1.5" height={6} />
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
                  <span>
                    Aciertos <strong className="text-fg">{s.attempts ? pct(s.accuracy) : '—'}</strong>
                  </span>
                  <span>
                    Dominadas <strong className="text-fg">{s.mastered}</strong>
                  </span>
                  <span>
                    Por repasar <strong className="text-fg">{s.due}</strong>
                  </span>
                  <span>
                    Sin ver <strong className="text-fg">{s.pending}</strong>
                  </span>
                  <span className="ml-auto">Peso {s.weight} %</span>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {weak.length > 0 && (
        <section>
          <SectionTitle title="Dónde conviene insistir" hint="Debilidad combinada con el peso de la materia" />
          <Card className="divide-y divide-line p-0">
            {weak.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                to={`/practicar?materia=${s.id}`}
                className="flex items-center gap-3 p-3.5 transition hover:bg-raised"
              >
                <span className="text-lg">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted">
                    {s.attempts
                      ? `${pct(s.recentAccuracy)} de aciertos recientes · ${s.pending} preguntas sin ver`
                      : 'Sin practicar todavía'}
                  </div>
                </div>
                <span className="text-xs font-semibold text-accent">Practicar</span>
              </Link>
            ))}
          </Card>
        </section>
      )}

      <section>
        <SectionTitle
          title="Insignias"
          hint={`${unlocked.length} de ${badges.length} conseguidas`}
          action={<IconTrophy className="text-muted" />}
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[...badges]
            .sort((a, b) => Number(b.unlocked) - Number(a.unlocked) || b.progressValue - a.progressValue)
            .map((badge) => (
              <div
                key={badge.id}
                className={`card p-3 transition ${badge.unlocked ? '' : 'opacity-60'}`}
                title={badge.description}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${badge.unlocked ? '' : 'grayscale'}`}>{badge.emoji}</span>
                  <span className="truncate text-xs font-bold">{badge.name}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted">{badge.description}</p>
                {!badge.unlocked && (
                  <ProgressBar value={badge.progressValue} className="mt-2" height={4} />
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
