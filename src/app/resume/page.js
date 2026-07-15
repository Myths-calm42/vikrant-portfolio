import Section from "@/components/Section";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <Section eyebrow="Resume" title="Resume">
      <p className="mb-6 text-muted">
        Download the latest version, or view it inline below.
      </p>
      <a
        href="/resume.pdf"
        download
        className="mb-10 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
      >
        Download PDF
      </a>
      {/* PLACEHOLDER — add /public/resume.pdf. Once added, this iframe will render it inline. */}
      <div className="overflow-hidden rounded-xl border border-hair" style={{ height: "80vh" }}>
        <iframe src="/resume.pdf" title="Resume" className="h-full w-full" />
      </div>
    </Section>
  );
}
