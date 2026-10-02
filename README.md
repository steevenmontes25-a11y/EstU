# EstU · Preparación para el examen de admisión (ESPOCH / UTM)

PWA instalable para preparar el examen de admisión universitaria en Ecuador, con la ponderación
inclinada hacia **Biología y Química** por tratarse de la carrera de **Zootecnia**.

Funciona sin backend y sin cuenta: todo el progreso vive en el `localStorage` del dispositivo.

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Para generar la versión de producción (carpeta `dist/`, servible desde cualquier hosting estático):

```bash
npm run build
```

`base` está fijado en `./`, así que el build funciona igual en la raíz de un dominio o en un
subdirectorio (GitHub Pages, Netlify, un subfolder de hosting compartido).

## Qué incluye

| Módulo | Dónde |
| --- | --- |
| Banco de 249 preguntas con explicación y dificultad | `src/data/questions/` |
| Ponderación por materia (Bio 25 %, Quím 25 %, Mate 15 %, Fís 10 %, Lengua 10 %, Historia 8 %, Emprend. 7 %) | `src/data/subjects.ts` |
| Repetición espaciada SM-2 | `src/lib/sm2.ts` |
| Selección de preguntas y armado de simulacros | `src/lib/selection.ts` |
| Estadísticas, materias débiles y nivel de preparación | `src/lib/stats.ts` |
| Plan de estudio automático | `src/lib/plan.ts` |
| Insignias y rachas | `src/lib/gamification.ts` |
| Fichas de consulta rápida | `src/data/notes.ts` |

### Modos de estudio

- **Práctica libre**: materia, tema, dificultad y cantidad a elección. Prioriza lo vencido y lo
  nunca visto, y devuelve al final de la sesión cada pregunta fallada.
- **Repaso espaciado**: solo lo que el algoritmo tiene vencido para hoy.
- **Simulacro**: examen cronometrado (60 preguntas / 90 min por defecto) con la mezcla ponderada,
  navegación libre entre preguntas y corrección solo al entregar.

### Cómo funciona el nivel de preparación

Por materia se combina cuánto se domina, la precisión reciente y la cobertura del banco:

```
score = 100 × (0,45 × dominadas/total + 0,30 × precisión_suavizada × confianza + 0,25 × vistas/total)
```

El nivel global es el promedio de esos puntajes ponderado por el peso de cada materia, así que
subir en Biología o Química mueve la aguja el doble que subir en Emprendimiento.

## Agregar preguntas

Cada materia es un archivo en `src/data/questions/`. Se añade un objeto al arreglo y listo:

```ts
{
  id: 'bio-043',              // único en todo el banco
  topic: 'Genética',          // agrupa el selector de temas
  difficulty: 'medio',        // 'facil' | 'medio' | 'dificil'
  prompt: '¿…?',
  options: ['A', 'B', 'C', 'D'],
  answer: 2,                  // índice de la opción correcta
  explanation: 'Por qué es esa.',
}
```

En modo desarrollo, `src/data/questions/index.ts` avisa por consola si hay ids duplicados,
opciones repetidas o respuestas fuera de rango.

## Notas técnicas

- **Stack**: React 18 + TypeScript + Vite + Tailwind. Sin librerías de gráficos ni de iconos: las
  visualizaciones son SVG propios (`src/components/charts.tsx`, `src/components/icons.tsx`).
- **PWA**: `public/manifest.webmanifest` y un service worker escrito a mano (`public/sw.js`) que
  cachea el shell y los assets. Los iconos se generan sin dependencias con `npm run icons`.
- **Recordatorios**: no hay push server, así que el aviso diario se dispara con un temporizador
  local y llega mientras la app esté abierta o instalada y activa en segundo plano.
- **Datos**: `Ajustes → Exportar progreso` descarga un JSON con todo el historial; `Importar copia`
  lo restaura. Es la única forma de pasar el progreso a otro dispositivo.
