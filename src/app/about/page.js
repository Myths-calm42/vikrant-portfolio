import Section from "@/components/Section";
import { skillGroups } from "@/data/skills";
import { achievements } from "@/data/research";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Section eyebrow="About" title="Vikrant Kumar">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 leading-relaxed text-ink/90">
          <p>
            I&apos;m an M.Tech student in Data Science &amp; Engineering (CSE) at NIT
            Silchar, currently maintaining a CGPA of{""}
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">
              8.32 
            </span>
            .
            My expertise spans medical imaging, data analytics, applied deep learning, 
            and generative AI, enabling me to transform complex healthcare data into accurate,
             interpretable, and intelligent AI solutions.
          </p>
          <p>
            My current research direction is on breast ultrasound (BUSI) classification
            using Mixture-of-Experts architectures — combining CNN branches and transfer
            learning as part of an ANRF/DST-funded project. This builds on
            a three-paper research arc culminating in MorphMoE, and my current objective
            targets segmentation-guided MorphMoE with GAN-based augmentation.
          </p>
          <p>
            I care more about building working AI <em>systems</em> than training isolated
            models — that means thinking through data pipelines, retrieval, evaluation,
            and deployment together, not just chasing benchmark numbers. That&apos;s the
            thread connecting my medical imaging research to recent generative AI projects
            like QLoRA fine-tuning and RAG-based story generation.
          </p>
          <p>
            Outside research, I build practical software: a freelance data analytics
            practice, full-stack web projects, and this portfolio itself.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-hair p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Quick Facts
            </h3>
            <ul className="space-y-2 text-sm text-ink/80">
              <li>M.Tech, Data Science &amp; Engineering — NIT Silchar</li>
              <li>ANRF/DST Project</li>
              <li>Based in Silchar, Assam India</li>
              <li>•Open to Gen AI Research roles •AI/ML Engineer  • Data Analyst</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-lg font-semibold text-ink">Skills</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-hair p-5">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                {group.title}
              </h4>
              <ul className="space-y-1.5 text-sm text-ink/80">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-lg font-semibold text-ink">Achievements</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <div key={a.title} className="rounded-xl border border-hair p-5">
              <h4 className="mb-1 font-medium text-ink">{a.title}</h4>
              <p className="text-sm text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
