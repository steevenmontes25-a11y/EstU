import { NavLink, Outlet } from 'react-router-dom'
import { useApp } from '../store/app'
import { daysUntil } from '../lib/date'
import { IconBook, IconCalendar, IconChart, IconFlame, IconHome, IconSettings, IconTarget } from './icons'

const NAV = [
  { to: '/', label: 'Inicio', Icon: IconHome, end: true },
  { to: '/practicar', label: 'Practicar', Icon: IconTarget },
  { to: '/progreso', label: 'Progreso', Icon: IconChart },
  { to: '/plan', label: 'Plan', Icon: IconCalendar },
  { to: '/apuntes', label: 'Apuntes', Icon: IconBook },
]

function navClass({ isActive }: { isActive: boolean }) {
  return [
    'flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-medium transition',
    isActive ? 'text-accent' : 'text-muted hover:text-fg',
  ].join(' ')
}

export default function Layout() {
  const { state, streak } = useApp()
  const left = daysUntil(state.settings.examDate)

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent text-sm font-black text-white">
              E
            </span>
            <span className="text-sm font-bold tracking-tight">EstU</span>
          </NavLink>

          <div className="ml-auto flex items-center gap-2">
            <span
              className="chip bg-raised text-muted"
              title={left >= 0 ? 'Días restantes hasta el examen' : 'La fecha estimada ya pasó'}
            >
              {left >= 0 ? `${left} d` : 'Fecha pasada'}
            </span>
            <span
              className={`chip ${streak.current > 0 ? 'bg-accent-soft text-accent' : 'bg-raised text-muted'}`}
              title="Racha de días estudiando"
            >
              <IconFlame width={13} height={13} />
              {streak.current}
            </span>
            <NavLink
              to="/ajustes"
              className="grid h-8 w-8 place-items-center rounded-xl text-muted transition hover:bg-raised hover:text-fg"
              aria-label="Ajustes"
            >
              <IconSettings width={18} height={18} />
            </NavLink>
          </div>
        </div>

        <nav className="mx-auto hidden w-full max-w-3xl gap-1 px-2 pb-1 md:flex">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition',
                  isActive ? 'bg-raised text-accent' : 'text-muted hover:bg-raised hover:text-fg',
                ].join(' ')
              }
            >
              <Icon width={17} height={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-4 md:pb-10">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur-md md:hidden">
        <div
          className="mx-auto flex max-w-3xl px-2 py-1"
          style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
        >
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass}>
              <Icon width={20} height={20} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
