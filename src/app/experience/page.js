import Section from "@/components/Section";
import { experience } from "@/data/experience";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <Section eyebrow="Experience" title="Timeline">
      <div className="space-y-0">
        {experience.map((item) => (
          <div key={item.role + item.org} className="relative border-l border-hair pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">
              {item.period}
            </p>
            <h3 className="mb-1 font-semibold text-ink">{item.role}</h3>
            <p className="mb-2 text-sm text-accent">{item.org}</p>
            <p className="leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
