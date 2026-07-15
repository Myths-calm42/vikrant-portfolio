import Section from "@/components/Section";
import { researchItems, publications } from "@/data/research";

export const metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <Section eyebrow="Research" title="Research & Contributions">
      <div className="space-y-8">
        {researchItems.map((item) => (
          <div key={item.title} className="rounded-xl border border-hair p-6">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent">
              {item.tag}
            </p>
            <h3 className="mb-2 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-lg font-semibold text-ink">Publications</h3>
        <div className="space-y-4">
          {publications.map((pub) => (
            <div
              key={pub.title}
              className="flex items-center justify-between rounded-xl border border-hair p-5"
            >
              <div>
                <p className="font-medium text-ink">{pub.title}</p>
                <p className="text-sm text-muted">{pub.venue}</p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs capitalize text-accent">
                {pub.status.replace("-", " ")}
              </span>
            </div>
          ))}
          <p className="text-sm text-muted">
            More publications will be listed here as they become available.
          </p>
        </div>
      </div>
    </Section>
  );
}
