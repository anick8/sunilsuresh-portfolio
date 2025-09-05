import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBlogPosts, useBlogPost } from "@/hooks/useBlog";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

type BlogSummary = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  publishedAt?: string;
};

const BlogSection = () => {
  const { data, isLoading, error } = useBlogPosts(1, 6);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const posts = (data as BlogSummary[] | undefined) ?? [];

  // Lock background scroll when modal is open
  useEffect(() => {
    if (openSlug) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openSlug]);

  // Hide the entire section if there are no posts
  if (!isLoading && !error && posts.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">Latest Updates</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm md:text-base">Fresh updates and stories</p>
        </motion.div>

        {isLoading && (
          <div className="text-center text-foreground/60">Loading posts…</div>
        )}
        {error && !isLoading && (
          <div className="text-center text-foreground/60">Couldn’t load posts.</div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, showAll ? 6 : 3).map((p) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl border shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                {p.coverImageUrl && (
                  <img
                    src={p.coverImageUrl}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                    {p.title}
                  </h3>
                  {p.publishedAt && (
                    <p className="text-xs text-foreground/60 mb-2">{new Date(p.publishedAt).toLocaleDateString()}</p>
                  )}
                  {p.excerpt && <p className="text-sm text-foreground/70 line-clamp-2 mb-3">{p.excerpt}</p>}
                  <div className="mt-2">
                    <button
                      className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:opacity-90"
                      onClick={() => setOpenSlug(p.slug)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && !error && posts.length > 3 && (
          <div className="text-center mt-8">
            <button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? "View less" : "View more updates"}
            </button>
          </div>
        )}

        {/* Modal overlay */}
        {openSlug && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpenSlug(null)} />
            <div className="relative z-[101] w-[92%] max-w-3xl max-h-[80vh] bg-card border rounded-xl shadow-2xl overflow-hidden">
              <div className="sticky top-0 flex items-center justify-between px-5 py-3 border-b bg-card/95 backdrop-blur">
                <h4 className="font-semibold">Post</h4>
                <button className="text-sm text-foreground/70 hover:text-foreground" onClick={() => setOpenSlug(null)}>Close</button>
              </div>
              <div className="p-5 text-sm text-foreground/80 overflow-auto max-h-[calc(80vh-56px)]">
                <PostBody slug={openSlug} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const PostBody = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useBlogPost(slug);
  if (isLoading) return <div>Loading…</div>;
  if (error || !data) return <div>Post not found.</div>;
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{data.title}</h3>
      {(data.publishedAt || data.author) && (
        <p className="text-xs text-foreground/60 mb-3">
          {data.publishedAt && new Date(data.publishedAt).toLocaleDateString()}
          {data.publishedAt && data.author ? " · " : ""}
          {data.author}
        </p>
      )}
      {Array.isArray(data.tags) && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((t: string) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs md:text-sm rounded-full bg-primary/15 text-primary border border-primary/30 font-medium"
              aria-label={`Tag: ${t}`}
            >
              #{t}
            </span>
          ))}
        </div>
      )}
      {data.excerpt && (
        <p className="text-sm text-foreground/80 mb-4">{data.excerpt}</p>
      )}
      {data.coverImageUrl && (
        <img src={data.coverImageUrl} alt={data.title} className="rounded-lg mb-4 w-full" />
      )}
      <div className="prose prose-invert max-w-none whitespace-pre-wrap">
        {documentToReactComponents(data.body as Document, {
          renderText: (text: string) => {
            return text.split("\n").reduce((acc: (string | JSX.Element)[], segment, i) => {
              if (i > 0) acc.push(<br key={i} />);
              acc.push(segment);
              return acc;
            }, []);
          },
        })}
      </div>
    </div>
  );
};

export default BlogSection;


