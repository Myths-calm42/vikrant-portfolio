import Link from "next/link";
import Section from "@/components/Section";
import { posts } from "@/data/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Section eyebrow="Writing" title="Blog">
      <p className="mb-10 text-muted">
        Notes on medical AI, generative models, and research-in-progress.
      </p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border-b border-hair pb-8 transition-opacity last:border-none hover:opacity-80"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">
              {post.date}
            </p>
            <h3 className="mb-2 text-lg font-semibold text-ink">{post.title}</h3>
            <p className="text-muted">{post.excerpt}</p>
            <span className="mt-3 inline-block text-sm font-medium text-accent">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
