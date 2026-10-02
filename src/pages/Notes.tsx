import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SubjectId } from '../types'
import { NOTES, type NoteBlock, type NoteCard as NoteCardType } from '../data/notes'
import { SUBJECTS, SUBJECT_BY_ID } from '../data/subjects'
import { Card, SectionTitle } from '../components/ui'
import { IconRight, IconTarget } from '../components/icons'

function Block({ block }: { block: NoteBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="text-sm leading-relaxed text-muted">{block.value}</p>

    case 'list':
      return (
        <ul className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-muted">{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'formulas':
      return (
        <div className="space-y-2">
          {block.items.map((f, i) => (
            <div key={i} className="rounded-xl bg-raised px-3 py-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">{f.name}</div>
              <div className="mt-0.5 font-mono text-sm font-semibold">{f.formula}</div>
              {f.note && <div className="mt-0.5 text-[11px] text-muted">{f.note}</div>}
            </div>
          ))}
        </div>
      )

    case 'table':
      return (
        <div className="scroll-x -mx-1 px-1">
          <table className="w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-line pb-1.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line/60 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`py-1.5 pr-3 align-top ${j === 0 ? 'font-medium' : 'text-muted'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'timeline':
      return (
        <ol className="relative space-y-3 border-l border-line pl-4">
          {block.items.map((item, i) => (
            <li key={i} className="relative">
              <span
                className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <div className="text-xs font-bold tabular-nums text-accent">{item.when}</div>
              <div className="text-sm text-muted">{item.what}</div>
            </li>
          ))}
        </ol>
      )
  }
}

function NoteItem({ note, open, onToggle }: { note: NoteCardType; open: boolean; onToggle: () => void }) {
  const subject = SUBJECT_BY_ID[note.subject]
  return (
    <Card className="p-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base"
          style={{ background: `${subject.hex}1f` }}
        >
          {subject.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">{note.title}</div>
          <div className="truncate text-xs text-muted">{note.summary}</div>
        </div>
        <IconRight
          className={`shrink-0 text-muted transition-transform ${open ? 'rotate-90' : ''}`}
          width={16}
          height={16}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-line p-4 animate-fade-up">
          {note.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
          <Link
            to={`/practicar?materia=${note.subject}`}
            className="btn-ghost w-full text-xs"
          >
            <IconTarget width={14} height={14} />
            Practicar {subject.name}
          </Link>
        </div>
      )}
    </Card>
  )
}

export default function NotesPage() {
  const [filter, setFilter] = useState<SubjectId | 'todas'>('todas')
  const [open, setOpen] = useState<string | null>(null)

  const notes = useMemo(
    () => (filter === 'todas' ? NOTES : NOTES.filter((n) => n.subject === filter)),
    [filter],
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Apuntes</h1>
        <p className="mt-1 text-sm text-muted">
          Fichas de consulta rápida: fórmulas, tablas y líneas de tiempo para revisar antes de practicar.
        </p>
      </div>

      <div className="scroll-x -mx-4 px-4">
        <div className="flex w-max gap-2 pb-1">
          <button
            type="button"
            onClick={() => setFilter('todas')}
            className={`chip border transition ${
              filter === 'todas' ? 'border-accent bg-accent-soft text-accent' : 'border-line text-muted'
            }`}
          >
            Todas
          </button>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setFilter(s.id)}
              className="chip border whitespace-nowrap transition"
              style={
                filter === s.id
                  ? { borderColor: s.hex, background: `${s.hex}1f`, color: s.hex }
                  : { borderColor: 'rgb(var(--c-line))', color: 'rgb(var(--c-muted))' }
              }
            >
              {s.emoji} {s.short}
            </button>
          ))}
        </div>
      </div>

      <SectionTitle title={`${notes.length} fichas`} hint="Toca una para desplegarla" />

      <div className="space-y-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            open={open === note.id}
            onToggle={() => setOpen(open === note.id ? null : note.id)}
          />
        ))}
      </div>
    </div>
  )
}
