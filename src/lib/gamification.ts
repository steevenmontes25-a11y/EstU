import type { AppState } from '../types'
import { SUBJECTS } from '../data/subjects'
import type { GlobalStat, StreakInfo, SubjectStat } from './stats'

export interface BadgeContext {
  state: AppState
  stats: SubjectStat[]
  streak: StreakInfo
  global: GlobalStat
  readiness: number
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  group: 'racha' | 'volumen' | 'materia' | 'simulacro' | 'nivel'
  /** Progreso hacia la insignia, de 0 a 1. */
  progress: (ctx: BadgeContext) => number
}

const ratio = (value: number, target: number) => Math.max(0, Math.min(1, value / target))

/** Mayor cadena de aciertos consecutivos registrada. */
export function bestAnswerStreak(state: AppState): number {
  let best = 0
  let run = 0
  for (const a of state.attempts) {
    run = a.correct ? run + 1 : 0
    if (run > best) best = run
  }
  return best
}

const streakBadge = (days: number, emoji: string, name: string): Badge => ({
  id: `racha-${days}`,
  name,
  description: `Estudia ${days} días seguidos sin romper la racha.`,
  emoji,
  group: 'racha',
  progress: ({ streak }) => ratio(Math.max(streak.current, streak.best), days),
})

const volumeBadge = (count: number, emoji: string, name: string): Badge => ({
  id: `volumen-${count}`,
  name,
  description: `Responde ${count} preguntas en total.`,
  emoji,
  group: 'volumen',
  progress: ({ global }) => ratio(global.attempts, count),
})

export const BADGES: Badge[] = [
  streakBadge(3, '🔥', 'Arranque'),
  streakBadge(7, '🔥', 'Semana completa'),
  streakBadge(14, '⚡', 'Dos semanas'),
  streakBadge(30, '🏆', 'Mes de disciplina'),

  volumeBadge(50, '🌱', 'Primeros pasos'),
  volumeBadge(250, '📚', 'Constancia'),
  volumeBadge(1000, '🧠', 'Maratón de estudio'),

  {
    id: 'aciertos-20',
    name: 'Sin fallar',
    description: 'Encadena 20 respuestas correctas seguidas.',
    emoji: '🎯',
    group: 'volumen',
    progress: ({ state }) => ratio(bestAnswerStreak(state), 20),
  },

  ...SUBJECTS.map<Badge>((s) => ({
    id: `materia-${s.id}`,
    name: `${s.name} dominada`,
    description: `Alcanza 80 % de preparación en ${s.name}.`,
    emoji: s.emoji,
    group: 'materia',
    progress: ({ stats }) => ratio(stats.find((x) => x.id === s.id)?.score ?? 0, 80),
  })),

  {
    id: 'simulacro-1',
    name: 'Primer simulacro',
    description: 'Completa un simulacro cronometrado de principio a fin.',
    emoji: '⏱️',
    group: 'simulacro',
    progress: ({ state }) => ratio(state.mocks.length, 1),
  },
  {
    id: 'simulacro-70',
    name: 'Nota de ingreso',
    description: 'Obtén 70 % o más en un simulacro completo.',
    emoji: '🥇',
    group: 'simulacro',
    progress: ({ state }) =>
      ratio(Math.max(0, ...state.mocks.map((m) => (m.total ? (m.correct / m.total) * 100 : 0))), 70),
  },
  {
    id: 'simulacro-3',
    name: 'Rodaje',
    description: 'Completa 3 simulacros.',
    emoji: '📝',
    group: 'simulacro',
    progress: ({ state }) => ratio(state.mocks.length, 3),
  },

  {
    id: 'nivel-50',
    name: 'A mitad de camino',
    description: 'Llega al 50 % de nivel de preparación.',
    emoji: '📈',
    group: 'nivel',
    progress: ({ readiness }) => ratio(readiness, 50),
  },
  {
    id: 'nivel-80',
    name: 'Listo para el examen',
    description: 'Llega al 80 % de nivel de preparación.',
    emoji: '🎓',
    group: 'nivel',
    progress: ({ readiness }) => ratio(readiness, 80),
  },
  {
    id: 'dominadas-50',
    name: 'Memoria de largo plazo',
    description: 'Consigue que 50 preguntas queden dominadas.',
    emoji: '🧩',
    group: 'nivel',
    progress: ({ global }) => ratio(global.mastered, 50),
  },
]

export interface BadgeState extends Badge {
  progressValue: number
  unlocked: boolean
}

export function evaluateBadges(ctx: BadgeContext): BadgeState[] {
  return BADGES.map((badge) => {
    const progressValue = badge.progress(ctx)
    return { ...badge, progressValue, unlocked: progressValue >= 1 }
  })
}

/** Insignias recién desbloqueadas respecto de lo ya registrado en el estado. */
export function newlyUnlocked(badges: BadgeState[], recorded: Record<string, number>): BadgeState[] {
  return badges.filter((b) => b.unlocked && !recorded[b.id])
}

export function readinessLabel(value: number): string {
  if (value >= 85) return 'Listo para rendir'
  if (value >= 70) return 'Buen nivel, sigue puliendo'
  if (value >= 50) return 'Vas por buen camino'
  if (value >= 25) return 'En construcción'
  return 'Recién empezando'
}
