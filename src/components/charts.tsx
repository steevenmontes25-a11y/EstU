import type { DayPoint, WeekPoint } from '../lib/stats'
import { formatShort } from '../lib/date'

const W = 320
const H = 132
const PAD_X = 22
const PAD_TOP = 12
const PAD_BOTTOM = 26

/** Evolución semanal del porcentaje de aciertos. Las semanas sin datos quedan como huecos. */
export function EvolutionChart({ points }: { points: WeekPoint[] }) {
  const plotW = W - PAD_X * 2
  const plotH = H - PAD_TOP - PAD_BOTTOM
  const x = (i: number) => PAD_X + (points.length > 1 ? (i * plotW) / (points.length - 1) : plotW / 2)
  const y = (accuracy: number) => PAD_TOP + plotH * (1 - accuracy)

  // Se dibujan tramos continuos: solo se unen semanas consecutivas con actividad.
  const segments: { i: number; point: WeekPoint }[][] = []
  let current: { i: number; point: WeekPoint }[] = []
  points.forEach((point, i) => {
    if (point.count > 0) current.push({ i, point })
    else if (current.length) {
      segments.push(current)
      current = []
    }
  })
  if (current.length) segments.push(current)

  const hasData = points.some((p) => p.count > 0)

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Evolución semanal de aciertos">
        {[0, 0.5, 1].map((g) => (
          <g key={g}>
            <line
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y(g)}
              y2={y(g)}
              className="stroke-line"
              strokeWidth={1}
              strokeDasharray={g === 0 ? undefined : '3 4'}
            />
            <text x={4} y={y(g) + 3} className="fill-muted" fontSize={8}>
              {Math.round(g * 100)}
            </text>
          </g>
        ))}

        {segments.map((segment, si) => {
          const d = segment.map((s, k) => `${k === 0 ? 'M' : 'L'} ${x(s.i)} ${y(s.point.accuracy)}`).join(' ')
          const area =
            segment.length > 1
              ? `${d} L ${x(segment[segment.length - 1]!.i)} ${y(0)} L ${x(segment[0]!.i)} ${y(0)} Z`
              : ''
          return (
            <g key={si}>
              {area && <path d={area} fill="rgb(var(--c-accent) / 0.12)" />}
              <path d={d} fill="none" stroke="rgb(var(--c-accent))" strokeWidth={2.5} strokeLinecap="round" />
            </g>
          )
        })}

        {points.map((point, i) =>
          point.count > 0 ? (
            <circle
              key={i}
              cx={x(i)}
              cy={y(point.accuracy)}
              r={3.5}
              fill="rgb(var(--c-surface))"
              stroke="rgb(var(--c-accent))"
              strokeWidth={2.5}
            />
          ) : null,
        )}

        {points.map((point, i) => (
          <text key={`l-${i}`} x={x(i)} y={H - 8} textAnchor="middle" fontSize={8} className="fill-muted">
            {/* Se etiqueta desde el final, para que la semana actual siempre lleve fecha. */}
            {(points.length - 1 - i) % 2 === 0 || points.length <= 5 ? point.label : ''}
          </text>
        ))}

        {!hasData && (
          <text x={W / 2} y={H / 2} textAnchor="middle" fontSize={10} className="fill-muted">
            Aún no hay datos suficientes
          </text>
        )}
      </svg>
    </figure>
  )
}

/** Tira de actividad diaria, al estilo del calendario de contribuciones. */
export function ActivityStrip({ days, goal }: { days: DayPoint[]; goal: number }) {
  return (
    <div className="flex flex-wrap gap-1" role="img" aria-label="Actividad de los últimos días">
      {days.map((day) => {
        const level = day.count === 0 ? 0 : Math.min(4, Math.ceil((day.count / Math.max(1, goal)) * 4))
        const opacity = [0, 0.28, 0.5, 0.72, 1][level]
        return (
          <span
            key={day.key}
            title={`${formatShort(day.date)}: ${day.count} preguntas`}
            className="h-4 w-4 rounded-[4px] border border-line"
            style={{ background: level === 0 ? 'rgb(var(--c-raised))' : `rgb(var(--c-accent) / ${opacity})` }}
          />
        )
      })}
    </div>
  )
}

export function SubjectBar({
  label,
  value,
  detail,
  color,
}: {
  label: string
  /** Valor de 0 a 1. */
  value: number
  detail: string
  color: string
}) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium truncate">{label}</span>
        <span className="text-xs text-muted tabular-nums shrink-0">{detail}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-raised">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.max(2, value * 100)}%`, background: color }}
        />
      </div>
    </div>
  )
}
