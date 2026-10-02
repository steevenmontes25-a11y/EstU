import type { Question } from '../types'
import { SUBJECT_BY_ID } from '../data/subjects'
import { DifficultyDot } from './ui'
import { IconCheck, IconX } from './icons'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionCard({
  question,
  chosen,
  revealed,
  onChoose,
  showSubject = true,
}: {
  question: Question
  chosen: number | null
  /** En práctica se revela al responder; en simulacro, solo al final. */
  revealed: boolean
  onChoose: (index: number) => void
  showSubject?: boolean
}) {
  const subject = SUBJECT_BY_ID[question.subject]
  const isCorrect = chosen === question.answer

  return (
    <div className="animate-fade-up">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {showSubject && (
          <span
            className="chip font-semibold"
            style={{ background: `${subject.hex}1f`, color: subject.hex }}
          >
            {subject.emoji} {subject.name}
          </span>
        )}
        <span className="chip bg-raised text-muted">{question.topic}</span>
        <DifficultyDot level={question.difficulty} />
      </div>

      <h2 className="text-[17px] font-semibold leading-snug">{question.prompt}</h2>

      <div className="mt-4 space-y-2">
        {question.options.map((option, i) => {
          const selected = chosen === i
          const correct = revealed && i === question.answer
          const wrong = revealed && selected && i !== question.answer

          const tone = correct
            ? 'border-ok bg-ok/10'
            : wrong
              ? 'border-bad bg-bad/10'
              : selected
                ? 'border-accent bg-accent-soft'
                : 'border-line bg-surface hover:border-accent/50'

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChoose(i)}
              disabled={revealed}
              aria-pressed={selected}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition
                          active:scale-[0.995] disabled:cursor-default ${tone}`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                  correct
                    ? 'bg-ok text-white'
                    : wrong
                      ? 'bg-bad text-white'
                      : selected
                        ? 'bg-accent text-white'
                        : 'bg-raised text-muted'
                }`}
              >
                {correct ? <IconCheck width={14} height={14} /> : wrong ? <IconX width={14} height={14} /> : LETTERS[i]}
              </span>
              <span className="pt-0.5">{option}</span>
            </button>
          )
        })}
      </div>

      {revealed && (
        <div
          className={`mt-4 rounded-xl border p-3 animate-fade-up ${
            isCorrect ? 'border-ok/30 bg-ok/5' : 'border-bad/30 bg-bad/5'
          }`}
        >
          <div className={`text-sm font-bold ${isCorrect ? 'text-ok' : 'text-bad'}`}>
            {isCorrect ? '¡Correcto!' : `Respuesta correcta: ${LETTERS[question.answer]}`}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
