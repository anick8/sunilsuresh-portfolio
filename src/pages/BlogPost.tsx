import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { useBlogPost } from "@/hooks/useBlog";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { data: post, isLoading, error } = useBlogPost(slug);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12">Loading…</div>;
  }
  if (error || !post) {
    return <div className="container mx-auto px-4 py-12">Post not found.</div>;
  }

  return (
    <HelmetProvider>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Helmet>
          <title>{post.seoTitle}</title>
          {post.seoDescription && (
            <meta name="description" content={post.seoDescription} />
          )}
        </Helmet>
        <h1 className="text-3xl font-display font-bold mb-4">{post.title}</h1>
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="rounded-xl mb-6 w-full"
          />
        )}
        <article className="prose prose-invert max-w-none">
          {documentToReactComponents(post.body as Document)}
        </article>
      </div>
    </HelmetProvider>
  );
};

export default BlogPost;


