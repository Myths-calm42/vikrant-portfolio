import Section from "@/components/Section";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Get in touch">
      <p className="mb-8 max-w-xl text-muted">
        Open to Gen AI research roles, collaborations, and freelance data analytics
        work. The fastest way to reach me is email.
      </p>
      <div className="flex flex-col gap-4 text-lg">
        <a href="mailto:vk909143@gmail.com" className="font-medium text-ink hover:text-accent">
          Email — vk909143@gmail.com
        </a>
        <a
          href="https://github.com/Myths-calm42"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-ink hover:text-accent"
        >
          GitHub — @Myths-calm42
        </a>
        <a
          href="https://www.linkedin.com/in/vikrant-kumar11022003/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-ink hover:text-accent"
        >
          LinkedIn — vikrant-kumar11022003
        </a>
        <a
          
          rel="noreferrer"
          className="font-medium text-ink hover:text-accent"
        >
          Mob No. — +919660708573
        </a>
      </div>
    </Section>
  );
}
