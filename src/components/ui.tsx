import type { CSSProperties, ReactNode } from 'react'

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  return <Tag className={`card p-4 ${className}`}>{children}</Tag>
}

export function SectionTitle({
  title,
  action,
  hint,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <div>
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
      {action}
    </div>
  )
}

export function ProgressBar({
  value,
  color,
  className = '',
  height = 8,
}: {
  /** Valor de 0 a 1. */
  value: number
  color?: string
  className?: string
  height?: number
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-raised ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%`, background: color ?? 'rgb(var(--c-accent))' }}
      />
    </div>
  )
}

export function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  children,
  color,
}: {
  /** Valor de 0 a 100. */
  value: number
  size?: number
  stroke?: number
  children?: ReactNode
  color?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100)
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-raised"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={color ?? 'rgb(var(--c-accent))'}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function StatTile({
  label,
  value,
  sub,
  tone = 'default',
}: {
  label: string
  value: ReactNode
  sub?: string
  tone?: 'default' | 'ok' | 'bad' | 'warn'
}) {
  const toneClass =
    tone === 'ok' ? 'text-ok' : tone === 'bad' ? 'text-bad' : tone === 'warn' ? 'text-warn' : 'text-fg'
  return (
    <div className="card p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className={`mt-1 text-xl font-bold tabular-nums ${toneClass}`}>{value}</div>
      {sub && <div className="text-[11px] text-muted mt-0.5">{sub}</div>}
    </div>
  )
}

export function Chip({
  children,
  tone = 'neutral',
  style,
}: {
  children: ReactNode
  tone?: 'neutral' | 'ok' | 'bad' | 'warn' | 'accent'
  style?: CSSProperties
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-raised text-muted',
    accent: 'bg-accent-soft text-accent',
    ok: 'bg-accent-soft text-ok',
    bad: 'bg-bad/10 text-bad',
    warn: 'bg-warn/10 text-warn',
  }
  return (
    <span className={`chip ${tones[tone]}`} style={style}>
      {children}
    </span>
  )
}

export function EmptyState({
  emoji,
  title,
  description,
  action,
}: {
  emoji: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="card p-8 text-center">
      <div className="text-3xl" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}

export function DifficultyDot({ level }: { level: 'facil' | 'medio' | 'dificil' }) {
  const map = {
    facil: { label: 'Fácil', color: 'rgb(var(--c-ok))' },
    medio: { label: 'Medio', color: 'rgb(var(--c-warn))' },
    dificil: { label: 'Difícil', color: 'rgb(var(--c-bad))' },
  } as const
  const { label, color } = map[level]
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {label}
    </span>
  )
}
