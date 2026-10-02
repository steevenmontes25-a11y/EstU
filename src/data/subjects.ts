import type { Subject, SubjectId } from '../types'

/**
 * Ponderacion pensada para Zootecnia (ciencias agropecuarias): Biologia y Quimica
 * concentran la mitad del examen simulado y del nivel de preparacion.
 */
export const SUBJECTS: Subject[] = [
  {
    id: 'biologia',
    name: 'Biología',
    short: 'Bio',
    weight: 25,
    accent: 'emerald',
    hex: '#10b981',
    emoji: '🧬',
    blurb: 'Célula, genética, sistemas y ecología. La materia madre de Zootecnia.',
  },
  {
    id: 'quimica',
    name: 'Química',
    short: 'Quím',
    weight: 25,
    accent: 'sky',
    hex: '#0ea5e9',
    emoji: '⚗️',
    blurb: 'Tabla periódica, enlaces, reacciones y estequiometría.',
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    short: 'Mate',
    weight: 15,
    accent: 'violet',
    hex: '#8b5cf6',
    emoji: '📐',
    blurb: 'Álgebra, funciones, proporciones y geometría básica.',
  },
  {
    id: 'fisica',
    name: 'Física',
    short: 'Fís',
    weight: 10,
    accent: 'amber',
    hex: '#f59e0b',
    emoji: '🚀',
    blurb: 'Cinemática, fuerzas, energía y electricidad.',
  },
  {
    id: 'lengua',
    name: 'Lengua y Literatura',
    short: 'Lengua',
    weight: 10,
    accent: 'rose',
    hex: '#f43f5e',
    emoji: '📖',
    blurb: 'Comprensión lectora, tipos de texto y literatura latinoamericana.',
  },
  {
    id: 'historia',
    name: 'Historia y Ciudadanía',
    short: 'Historia',
    weight: 8,
    accent: 'orange',
    hex: '#fb923c',
    emoji: '🏛️',
    blurb: 'Civilizaciones antiguas, revoluciones y derechos ciudadanos.',
  },
  {
    id: 'emprendimiento',
    name: 'Emprendimiento y Gestión',
    short: 'Emprend',
    weight: 7,
    accent: 'teal',
    hex: '#14b8a6',
    emoji: '💡',
    blurb: 'Modelo de negocio, costos, oferta y demanda, contabilidad básica.',
  },
]

export const SUBJECT_BY_ID: Record<SubjectId, Subject> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s]),
) as Record<SubjectId, Subject>

export const SUBJECT_IDS = SUBJECTS.map((s) => s.id)

export const PRIORITY_SUBJECTS: SubjectId[] = ['biologia', 'quimica']
