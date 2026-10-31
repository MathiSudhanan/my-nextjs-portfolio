import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Layout";
import { ArtCard, type Art } from "@/features/martial-arts/ArtCard";

// Preview of the martial art cards with clearly fake data, so the layout can be reviewed
// before the real entries are published. Hidden in production like the rest of /design-system.
const samples: Art[] = [
  {
    _id: "a1",
    name: "Sample art one",
    nativeName: "サンプル",
    startYear: 2000,
    school: "Sample school",
    summary: "Sample summary: one or two sentences about what this art is.",
    whatItDemands: "Sample text about what the training demands.",
    whatItTaught: "Sample text about what it taught me.",
    engineeringParallel: "Sample parallel: one concrete behaviour that shows up in engineering.",
    gallery: null,
  },
  {
    _id: "a2",
    name: "Sample art two",
    nativeName: null,
    startYear: null,
    school: null,
    summary: "Sample summary without a start year, notes or photographs.",
    whatItDemands: null,
    whatItTaught: null,
    engineeringParallel: "Sample parallel: one concrete behaviour that shows up in engineering.",
    gallery: null,
  },
];

export default function MartialArtsPreview() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <Container className="py-section">
      <ul className="grid gap-6 lg:grid-cols-2">
        {samples.map((art) => (
          <li key={art._id} className="flex">
            <ArtCard art={art} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
