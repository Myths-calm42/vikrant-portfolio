export default function Section({ title, eyebrow, children, className = "" }) {
  return (
    <section className={`mx-auto max-w-5xl px-6 py-16 ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
