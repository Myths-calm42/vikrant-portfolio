"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-ink">
          Vikrant Kumar
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-accent ${
                    active ? "text-accent" : "text-ink/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="text-sm text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-hair px-6 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-ink/80 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
