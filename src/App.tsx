import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import BadgeToaster from './components/BadgeToaster'
import Dashboard from './pages/Dashboard'
import PracticePage from './pages/Practice'
import MockPage from './pages/Mock'
import ProgressPage from './pages/Progress'
import PlanPage from './pages/Plan'
import NotesPage from './pages/Notes'
import SettingsPage from './pages/Settings'
import SessionPage from './pages/Session'
import ResultPage from './pages/Result'
import { useApp } from './store/app'
import { cancelReminder, scheduleReminder } from './lib/notifications'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Mantiene programado el recordatorio diario mientras la app esté abierta. */
function ReminderScheduler() {
  const { state, streak } = useApp()
  const { reminderEnabled, reminderTime } = state.settings

  useEffect(() => {
    if (!reminderEnabled) {
      cancelReminder()
      return
    }
    // Solo molesta si el día realmente se está yendo sin estudiar.
    scheduleReminder(reminderTime, () => !streak.studiedToday)
    return cancelReminder
  }, [reminderEnabled, reminderTime, streak.studiedToday])

  return null
}

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <ReminderScheduler />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="practicar" element={<PracticePage />} />
          <Route path="simulacro" element={<MockPage />} />
          <Route path="progreso" element={<ProgressPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="apuntes" element={<NotesPage />} />
          <Route path="ajustes" element={<SettingsPage />} />
        </Route>
        <Route path="/sesion" element={<SessionPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BadgeToaster />
    </HashRouter>
  )
}
