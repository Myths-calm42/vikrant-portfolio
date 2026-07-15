import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { posts } from "@/data/posts";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Renders **bold**, `code`, and [text](url)
function renderInline(text) {
  const parts = text
    .split(/(\*\*.+?\*\*|`.+?`|\[.+?\]\(.+?\))/g)
    .filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-accent-soft px-1.5 py-0.5 text-sm text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);

    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:text-accent-dark"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 mb-4 text-2xl font-semibold text-ink">
          {renderInline(block.text)}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-accent bg-accent-soft/40 px-5 py-4 italic text-ink/90">
          {renderInline(block.text)}
        </blockquote>
      );

    case "p":
    default:
      return (
        <p className="mb-5 leading-8 text-ink/90">
          {renderInline(block.text)}
        </p>
      );
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <Section className="max-w-3xl">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-accent hover:text-accent-dark"
      >
        ← Back to Blog
      </Link>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
        {post.date}
      </p>

      <h1 className="mb-10 text-4xl font-bold tracking-tight text-ink">
        {post.title}
      </h1>

      <article className="prose prose-neutral max-w-none">
        {post.body.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </article>
    </Section>
  );
}