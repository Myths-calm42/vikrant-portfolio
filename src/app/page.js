import Link from "next/link";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 md:pt-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-accent">
          M.Tech Data Science & Engineering · NIT Silchar
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          Building Intelligent AI Solutions for Healthcare Research, Data Analytics, and Generative AI.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I&apos;m Vikrant Kumar — an AI researcher working across Medical AI, Computer
          Vision, Generative AI, and Large Language Models, currently contributing to an
          ANRF/DST-funded cancer detection research project.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="rounded-full border border-hair px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Resume
          </Link>
        </div>
      </section>

      <Section eyebrow="Focus Areas" title="What I work on">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Medical AI", desc: "Breast ultrasound classification, MoE architectures, transfer learning." },
            { title: "Computer Vision", desc: "CNNs, Grad-CAM interpretability, medical image processing." },
            { title: "Generative AI", desc: "LLM fine-tuning (QLoRA), RAG pipelines, long-context generation." },
            { title: "AI Research", desc: "Government-funded research, workshop contributions, applied experiments." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-hair p-6">
              <h3 className="mb-2 font-semibold text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Selected Work" title="Featured Projects">
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-block text-sm font-medium text-accent hover:text-accent-dark"
        >
          See all projects →
        </Link>
      </Section>
    </>
  );
}
