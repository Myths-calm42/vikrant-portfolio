"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects, categoryLabels } from "@/data/projects";

const filters = ["all", "genai", "medical-ai", "data-analytics", "web-dev"];

export default function ProjectsPage() {
  const [active, setActive] = useState("all");

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <Section eyebrow="Projects" title="Work across four domains">
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === f
                ? "border-accent bg-accent text-paper"
                : "border-hair text-ink/70 hover:border-accent hover:text-accent"
            }`}
          >
            {f === "all" ? "All" : categoryLabels[f]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
