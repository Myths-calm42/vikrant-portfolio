export default function ProjectCard({ project }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-xl border border-hair bg-accent-soft/30 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40">
      <div>
        <h3 className="mb-2 font-semibold text-ink">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-xs text-accent"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="text-ink/70 hover:text-accent">
            GitHub →
          </a>
        )}
        {project.demoOnRequest && (
          <span className="text-ink/70 cursor-default">
    Demo on Request
  </span>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="text-ink/70 hover:text-accent">
            Live →
          </a>
        )}
      </div>
    </div>
  );
}
