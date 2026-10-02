import { useRef, useState } from 'react'
import { useApp } from '../store/app'
import { exportState, importState, initialState } from '../lib/storage'
import {
  notificationPermission,
  notificationsSupported,
  requestNotificationPermission,
  showNotification,
} from '../lib/notifications'
import { useInstallPrompt } from '../lib/pwa'
import { QUESTIONS } from '../data/questions'
import { Card, SectionTitle } from '../components/ui'
import { IconBell, IconDownload, IconTrash, IconUpload } from '../components/icons'

const GOALS = [10, 15, 20, 30, 40]

export default function SettingsPage() {
  const { state, updateSettings, replaceState } = useApp()
  const { canInstall, installed, install } = useInstallPrompt()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [permission, setPermission] = useState(notificationPermission())

  const enableReminders = async () => {
    const result = await requestNotificationPermission()
    setPermission(result)
    if (result === 'granted') {
      updateSettings({ reminderEnabled: true })
      void showNotification('Recordatorios activados', 'Te avisaremos si el día se va sin estudiar.')
    } else {
      setMessage('El navegador bloqueó las notificaciones. Puedes habilitarlas desde sus ajustes.')
    }
  }

  const download = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `estu-progreso-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Copia descargada.')
  }

  const upload = async (file: File) => {
    try {
      replaceState(importState(await file.text()))
      setMessage('Progreso restaurado correctamente.')
    } catch {
      setMessage('No se pudo leer el archivo. ¿Es una copia exportada desde EstU?')
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">Ajustes</h1>

      <Card className="space-y-4">
        <label className="block">
          <span className="label">Tu nombre</span>
          <input
            type="text"
            className="field"
            placeholder="Para el saludo del inicio"
            value={state.settings.name}
            onChange={(e) => updateSettings({ name: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="label">Fecha estimada del examen</span>
          <input
            type="date"
            className="field"
            value={state.settings.examDate}
            onChange={(e) => updateSettings({ examDate: e.target.value })}
          />
          <span className="mt-1.5 block text-xs text-muted">
            Cámbiala cuando se confirme la convocatoria de ESPOCH o UTM.
          </span>
        </label>

        <div>
          <span className="label">Meta diaria</span>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateSettings({ dailyGoal: g })}
                className={`chip border tabular-nums transition ${
                  state.settings.dailyGoal === g
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface text-muted'
                }`}
              >
                {g} preguntas
              </button>
            ))}
          </div>
        </div>
      </Card>

      <section>
        <SectionTitle title="Recordatorios" hint="Para no romper la racha de estudio" />
        <Card className="space-y-3">
          {!notificationsSupported() ? (
            <p className="text-sm text-muted">Este navegador no admite notificaciones.</p>
          ) : permission !== 'granted' ? (
            <button type="button" onClick={enableReminders} className="btn-primary w-full">
              <IconBell width={16} height={16} />
              Activar recordatorios
            </button>
          ) : (
            <>
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Recordatorio diario</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[rgb(var(--c-accent))]"
                  checked={state.settings.reminderEnabled}
                  onChange={(e) => updateSettings({ reminderEnabled: e.target.checked })}
                />
              </label>
              <label className="block">
                <span className="label">Hora del aviso</span>
                <input
                  type="time"
                  className="field"
                  value={state.settings.reminderTime}
                  onChange={(e) => updateSettings({ reminderTime: e.target.value })}
                />
              </label>
              <button
                type="button"
                className="btn-outline w-full text-xs"
                onClick={() => void showNotification('Prueba de recordatorio', 'Así se verá el aviso diario.')}
              >
                Enviar una notificación de prueba
              </button>
            </>
          )}
          <p className="text-xs text-muted">
            EstU no usa servidores: el aviso se dispara desde el propio dispositivo, así que llega
            mientras la app esté abierta o instalada y activa en segundo plano.
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle title="Tus datos" hint="Todo se guarda solo en este dispositivo" />
        <Card className="space-y-2">
          <button type="button" onClick={download} className="btn-outline w-full">
            <IconDownload width={16} height={16} />
            Exportar progreso
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline w-full">
            <IconUpload width={16} height={16} />
            Importar copia
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void upload(file)
              e.target.value = ''
            }}
          />

          {confirmReset ? (
            <div className="rounded-xl border border-bad/40 bg-bad/5 p-3">
              <p className="text-sm font-semibold text-bad">
                Se borrará todo tu progreso, rachas e insignias.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="btn-ghost flex-1 text-xs"
                  onClick={() => setConfirmReset(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn flex-1 bg-bad text-xs text-white"
                  onClick={() => {
                    replaceState(initialState())
                    setConfirmReset(false)
                    setMessage('Progreso reiniciado.')
                  }}
                >
                  Borrar todo
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="btn w-full text-bad hover:bg-bad/10"
            >
              <IconTrash width={16} height={16} />
              Reiniciar progreso
            </button>
          )}

          {message && <p className="text-xs text-accent">{message}</p>}
        </Card>
      </section>

      <section>
        <SectionTitle title="Sobre la app" />
        <Card className="space-y-2 text-sm text-muted">
          <p>
            <strong className="text-fg">EstU</strong> prepara el examen de admisión de ESPOCH y UTM con
            énfasis en Zootecnia: Biología y Química pesan la mitad de cada simulacro.
          </p>
          <p>
            Banco actual: <strong className="text-fg">{QUESTIONS.length}</strong> preguntas con
            explicación en siete materias.
          </p>
          <p>
            Funciona sin conexión y sin cuenta. Si borras los datos del navegador, exporta antes tu
            progreso.
          </p>
          {canInstall && (
            <button type="button" onClick={install} className="btn-primary mt-2 w-full">
              Instalar en este dispositivo
            </button>
          )}
          {installed && <p className="text-xs text-accent">App instalada en este dispositivo.</p>}
        </Card>
      </section>
    </div>
  )
}
