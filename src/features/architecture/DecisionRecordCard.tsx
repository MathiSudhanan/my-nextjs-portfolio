import type { DecisionRecord } from "@/sanity.types";

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="type-label text-muted">{label}</dt>
      <dd className="text-fg">{children}</dd>
    </div>
  );
}

/** An architecture decision record: what was decided, why, and what was rejected. */
export function DecisionRecordCard({ record }: { record: DecisionRecord }) {
  return (
    <article className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 md:p-8">
      <header className="flex flex-col gap-2">
        {record.code ? <p className="type-label text-accent">{record.code}</p> : null}
        <h3 className="type-h3 text-fg-strong">{record.title}</h3>
      </header>
      <dl className="grid gap-5">
        {record.context ? <Field label="Context">{record.context}</Field> : null}
        {record.decision ? <Field label="Decision">{record.decision}</Field> : null}
        {record.consequences ? <Field label="Consequences">{record.consequences}</Field> : null}
      </dl>
      {record.rejected?.length ? (
        <div className="flex flex-col gap-3 border-t border-line pt-5">
          <p className="type-label text-muted">Rejected options</p>
          <ul className="flex flex-col gap-3">
            {record.rejected.map((option) => (
              <li key={option._key} className="text-fg">
                <span className="font-medium text-fg-strong">{option.option}</span>
                {option.reason ? <span className="text-muted">{` — ${option.reason}`}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
