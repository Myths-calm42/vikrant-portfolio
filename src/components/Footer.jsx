export default function Footer() {
  return (
    <footer className="border-t border-hair">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Vikrant Kumar. Built with Next.js.</p>
        <div className="flex gap-6">
          <a href="https://github.com/Myths-calm42" className="hover:text-accent" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vikrant-kumar11022003/"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:vk909143@gmail.com" className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
