/**
 * Recordatorios de estudio.
 *
 * La app no tiene backend, así que no hay push real: el aviso se programa con un
 * temporizador y llega mientras la aplicación siga abierta (o instalada y viva en
 * segundo plano). Es intencional, y la interfaz lo dice para no prometer de más.
 */

export const notificationsSupported = (): boolean => typeof window !== 'undefined' && 'Notification' in window

export const notificationPermission = (): NotificationPermission =>
  notificationsSupported() ? Notification.permission : 'denied'

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return 'denied'
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

export async function showNotification(title: string, body: string): Promise<void> {
  if (notificationPermission() !== 'granted') return
  try {
    const reg = await navigator.serviceWorker?.getRegistration()
    if (reg?.active) {
      reg.active.postMessage({ type: 'notify', title, body })
      return
    }
    new Notification(title, { body, icon: './icons/icon-192.png' })
  } catch {
    /* el navegador puede bloquearlo; no es crítico */
  }
}

let timer: number | undefined

/** Milisegundos hasta la próxima ocurrencia de HH:MM. */
export function msUntil(time: string): number {
  const [h, m] = time.split(':').map(Number)
  const target = new Date()
  target.setHours(h ?? 19, m ?? 0, 0, 0)
  if (target.getTime() <= Date.now()) target.setDate(target.getDate() + 1)
  return target.getTime() - Date.now()
}

export function cancelReminder(): void {
  if (timer !== undefined) {
    window.clearTimeout(timer)
    timer = undefined
  }
}

export function scheduleReminder(time: string, shouldNotify: () => boolean): void {
  cancelReminder()
  if (notificationPermission() !== 'granted') return
  const delay = msUntil(time)
  // setTimeout no es fiable más allá de ~24 días; aquí siempre es menos de 24 horas.
  timer = window.setTimeout(() => {
    if (shouldNotify()) {
      void showNotification('Es hora de estudiar 📚', 'No pierdas la racha: 20 preguntas y listo.')
    }
    scheduleReminder(time, shouldNotify)
  }, delay)
}
