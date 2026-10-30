import type { CaseStudyIndexQueryResult, CaseStudyQueryResult } from "@/sanity.types";

/**
 * A fictional case study that exercises every part of the template. It is shown only
 * outside production (see data.ts) and is never written to Sanity. Replace it by
 * publishing real case studies in the Studio.
 */
export const SAMPLE_SLUG = "sample-order-platform";

type Sample = NonNullable<CaseStudyQueryResult>;

const block = (key: string, text: string, style: "normal" | "h3" = "normal") => ({
  _type: "block" as const,
  _key: key,
  style,
  children: [{ _type: "span" as const, _key: `${key}-s`, text, marks: [] }],
});

export const sampleCaseStudy: Sample = {
  _id: "sample-case-study",
  title: "Sample: splitting a monolithic order platform",
  slug: SAMPLE_SLUG,
  outcome: "Sample outcome: cut checkout p95 from 1.8 s to 240 ms while releasing weekly.",
  summary:
    "A fictional case study that shows the template. Replace it with a real project from the Studio.",
  role: "Lead architect",
  domain: "E-commerce (sample)",
  period: "2023–24",
  duration: "14 months",
  teamSize: 12,
  confidential: true,
  heroImage: { asset: null, hotspot: null, alt: null, decorative: true, caption: null, lqip: null },
  techStack: ["ASP.NET Core", "PostgreSQL", "Next.js", "TypeScript"],
  problem: [
    block(
      "p1",
      "Sample text. Describe what was wrong in terms the business would use: lost orders, slow releases, rising cost.",
    ),
    block("p2", "Releases took three weeks because every change touched one shared deployment."),
  ],
  context: [block("c1", "Sample text. The company, the system, the team and its history.")],
  constraints: [
    "No downtime during peak trading",
    "Fixed budget, no new headcount",
    "Existing SQL Server licences",
  ],
  leadership: [
    block("l1", "Sample text. How the team was organised and what changed in how it worked."),
  ],
  architecture: [
    block("a1", "Sample text. The design in prose, with up to three diagrams."),
    block("a2", "Request path", "h3"),
    block(
      "a3",
      "Browsers call a Next.js edge layer, which calls order and catalogue services over HTTP.",
    ),
  ],
  technologyDecisions: [
    {
      _key: "d1",
      _type: "decisionRecord",
      code: "ADR-01",
      title: "Extract orders first, behind a strangler façade",
      context: "Orders caused most deployment conflicts and held the strictest latency target.",
      decision:
        "Route order traffic through a façade and move it to its own service, one endpoint at a time.",
      consequences: "Two data stores to reconcile for six months; releases decouple immediately.",
      rejected: [
        {
          _key: "r1",
          _type: "rejectedOption",
          option: "Big-bang rewrite",
          reason: "Too risky for peak trading.",
        },
        {
          _key: "r2",
          _type: "rejectedOption",
          option: "Event-sourced orders",
          reason: "The team had no operating experience.",
        },
      ],
    },
  ],
  tradeOffs: [
    {
      _key: "t1",
      _type: "tradeOff",
      choice: "Synchronous HTTP between services",
      gained: "Simple to debug and to reason about",
      gaveUp: "Resilience to a slow dependency, until timeouts and circuit breakers were added",
    },
  ],
  dataFlow: [block("df1", "Sample text. How data moves, and where it is the source of truth.")],
  security: [block("s1", "Sample text. What could be attacked, and what guards it.")],
  scalability: [block("sc1", "Sample text. Where it scales, where it will not, and why.")],
  performance: [block("pf1", "Sample text. What was measured and what was changed.")],
  deployment: [block("dp1", "Sample text. How it ships and runs.")],
  metrics: [
    {
      _key: "m1",
      _type: "metric",
      label: "Checkout p95 latency",
      before: "1.8 s",
      after: "240 ms",
      source: "Sample data",
    },
    {
      _key: "m2",
      _type: "metric",
      label: "Release cadence",
      before: "Every 3 weeks",
      after: "Weekly",
      source: "Sample data",
    },
  ],
  lessons: [
    block("ls1", "Sample text. What you would do differently. Senior readers look at this first."),
  ],
  seo: { metaTitle: null, metaDescription: null, noIndex: true },
};

export const sampleIndexEntry: CaseStudyIndexQueryResult[number] = {
  _id: sampleCaseStudy._id,
  title: sampleCaseStudy.title,
  slug: sampleCaseStudy.slug,
  outcome: sampleCaseStudy.outcome,
  summary: sampleCaseStudy.summary,
  domain: sampleCaseStudy.domain,
  role: sampleCaseStudy.role,
  period: sampleCaseStudy.period,
  teamSize: sampleCaseStudy.teamSize,
  heroImage: sampleCaseStudy.heroImage,
  techStack: sampleCaseStudy.techStack,
};
