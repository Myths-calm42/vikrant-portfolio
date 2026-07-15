export default function sitemap() {
  const base = "https://vikrant-portfolio-chi.vercel.app";
  const routes = ["", "/about", "/research", "/projects", "/experience", "/blog", "/resume", "/contact"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
