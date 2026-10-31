import { Tag } from "@/components/ui/Badges";
import { formatDuration, formatMonthYear } from "@/lib/dates";
import type { ExperienceQueryResult } from "@/sanity.types";

type Role = ExperienceQueryResult[number];

function Dates({ role }: { role: Role }) {
  const current = role.isCurrentlyWorkingHere || !role.dateEnded;
  const end = current ? null : role.dateEnded;
  return (
    <p className="type-label text-accent">
      {formatMonthYear(role.dateStarted)} – {end ? formatMonthYear(end) : "Present"}
      <span className="text-muted"> · {formatDuration(role.dateStarted, end)}</span>
    </p>
  );
}

/** Roles along a vertical line, newest first. */
export function Timeline({ roles }: { roles: readonly Role[] }) {
  return (
    <ol className="relative flex flex-col gap-12 border-l border-line pl-6 md:pl-10">
      {roles.map((role) => {
        // Blank bullets are left over from the old site; skip them.
        const points = (role.points ?? []).filter((point) => point.trim().length > 0);
        const place = [role.company, role.location].filter(Boolean).join(" · ");
        return (
          <li key={role._id} className="reveal relative flex flex-col gap-4">
            <span
              aria-hidden="true"
              className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full border-2 border-accent bg-bg md:-left-[2.9rem]"
            />
            <Dates role={role} />
            <div className="flex flex-col gap-1">
              <h2 className="type-h3 text-fg-strong">{role.jobTitle}</h2>
              <p className="text-fg">
                {place}
                {role.teamSize ? <span className="text-muted">{` · Team of ${role.teamSize}`}</span> : null}
              </p>
            </div>
            {role.summary ? <p className="max-w-prose text-muted">{role.summary}</p> : null}
            {points.length > 0 ? (
              <ul className="max-w-prose list-disc space-y-2 pl-5 text-fg marker:text-accent">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            {role.techStack?.length ? (
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {role.techStack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
