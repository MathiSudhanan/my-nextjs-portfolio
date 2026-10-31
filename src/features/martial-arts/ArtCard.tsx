import Image from "next/image";
import { resolveImage } from "@/lib/sanity/image";
import type { MartialArtsQueryResult } from "@/sanity.types";

export type Art = MartialArtsQueryResult["arts"][number];

/** One martial art: what it is, where it shows up in engineering, and optional personal notes and photographs. */
export function ArtCard({ art }: { art: Art }) {
  const photos = (art.gallery ?? []).flatMap((photo) => {
    const image = resolveImage(photo);
    return image ? [{ photo, image }] : [];
  });

  return (
    <article className="flex w-full flex-col gap-6 rounded-card border border-line bg-surface p-6 md:p-8">
      <header className="flex flex-col gap-2">
        <p className="type-label text-accent">
          {art.startYear ? `Began ${art.startYear}` : "Ongoing practice"}
          {art.school ? <span className="text-muted">{` · ${art.school}`}</span> : null}
        </p>
        <h2 className="type-h3 text-fg-strong">
          {art.name}
          {art.nativeName ? (
            <span lang="und" className="ml-3 font-normal text-muted">
              {art.nativeName}
            </span>
          ) : null}
        </h2>
        <p className="text-fg">{art.summary}</p>
      </header>

      <div className="border-l-2 border-accent pl-5">
        <p className="type-label mb-2 text-muted">In engineering</p>
        <p className="text-fg-strong">{art.engineeringParallel}</p>
      </div>

      {art.whatItDemands || art.whatItTaught ? (
        <dl className="grid gap-4">
          {art.whatItDemands ? (
            <div className="flex flex-col gap-1">
              <dt className="type-label text-muted">What the training demands</dt>
              <dd className="text-fg">{art.whatItDemands}</dd>
            </div>
          ) : null}
          {art.whatItTaught ? (
            <div className="flex flex-col gap-1">
              <dt className="type-label text-muted">What it taught me</dt>
              <dd className="text-fg">{art.whatItTaught}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {photos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3">
          {photos.map(({ photo, image }) => (
            <li key={photo._key}>
              <figure className="flex flex-col gap-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 240px, 45vw"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                  className="aspect-[4/5] w-full rounded-control object-cover"
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
                {photo.caption || photo.credit ? (
                  <figcaption className="text-small text-muted">
                    {[photo.caption, photo.credit].filter(Boolean).join(" · ")}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
