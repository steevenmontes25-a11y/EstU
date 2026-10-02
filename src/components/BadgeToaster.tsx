import { useEffect } from 'react'
import { useApp } from '../store/app'

/** Avisa una sola vez cuando se desbloquea una insignia. */
export default function BadgeToaster() {
  const { celebrations, dismissCelebration } = useApp()
  const current = celebrations[0]

  useEffect(() => {
    if (!current) return
    const id = window.setTimeout(() => dismissCelebration(current.id), 5000)
    return () => window.clearTimeout(id)
  }, [current, dismissCelebration])

  if (!current) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={() => dismissCelebration(current.id)}
        className="card pointer-events-auto flex max-w-sm items-center gap-3 border-accent/40 bg-surface p-3 shadow-lg animate-slide-in"
      >
        <span className="text-2xl">{current.emoji}</span>
        <span className="text-left">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-accent">
            Insignia desbloqueada
          </span>
          <span className="block text-sm font-bold">{current.name}</span>
        </span>
      </button>
    </div>
  )
}
