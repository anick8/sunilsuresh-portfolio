import { useQuery } from "@tanstack/react-query";
import { fetchBlogPostBySlug, fetchBlogPosts } from "@/services/contentful";

export const useBlogPosts = (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  return useQuery({
    queryKey: ["blogPosts", page, pageSize],
    queryFn: () => fetchBlogPosts(pageSize, skip),
    staleTime: 60_000,
  });
};

export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: !!slug,
    staleTime: 60_000,
  });


