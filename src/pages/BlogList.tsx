import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlog";

const BlogList = () => {
  const { data, isLoading, error } = useBlogPosts(1, 12);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">Loading…</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">Failed to load posts.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Blog</h1>
      {(!data || data.length === 0) && (
        <div className="rounded-xl border bg-card p-8 text-center text-foreground/70">
          No posts yet. Check back soon!
        </div>
      )}
      {data && data.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="block bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow"
          >
            {p.coverImageUrl && (
              <img
                src={p.coverImageUrl}
                alt={p.title}
                className="rounded-lg mb-4 w-full h-48 object-cover"
                loading="lazy"
              />
            )}
            <h2 className="text-xl font-semibold">{p.title}</h2>
            {p.excerpt && (
              <p className="text-muted-foreground mt-2">{p.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
      )}
    </div>
  );
};

export default BlogList;


