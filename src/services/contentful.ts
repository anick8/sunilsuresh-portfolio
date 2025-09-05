import { createClient } from "contentful";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string;
const usePreview = import.meta.env.VITE_CONTENTFUL_USE_PREVIEW === "true";
const accessToken = usePreview
  ? (import.meta.env.VITE_CONTENTFUL_CPA_TOKEN as string)
  : (import.meta.env.VITE_CONTENTFUL_CDA_TOKEN as string);

export const contentful = createClient({
  space,
  accessToken,
  host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
});

export type BlogPostFields = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  body: any;
  author?: string;
  tags?: string[];
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type EventFields = {
  title: string;
  date: string;
  time: string;
  location: string;
  status: "Available" | "Limited" | "Sold Out";
  description?: string;
  ticketLink?: string;
  featured?: boolean;
  sortOrder?: number; // preferred field ID for manual ordering
  integer?: number;   // fallback if your field ID is named "integer"
  category?: string;  // Corporate | Social | Community (optional)
  showOnHomepage?: boolean;
  isPrestigious?: boolean;
  sectionOrder?: number;
};

export type GalleryImageFields = {
  title: string;
  altText?: string;
  image: any;
  sortOrder?: number;
  showOnHomepage?: boolean;
};

export async function fetchBlogPosts(limit = 10, skip = 0) {
  const res = await contentful.getEntries({
    content_type: "blogPost",
    order: ["-fields.publishedAt"],
    limit,
    skip,
  });

  return res.items.map((e: any) => {
    const f = (e?.fields || {}) as BlogPostFields & { coverImage?: any };
    return {
      title: f.title,
      slug: f.slug,
      excerpt: f.excerpt,
      body: (f as any).body,
      coverImageUrl: (f as any)?.coverImage?.fields?.file?.url
      ? `https:${(f as any).coverImage.fields.file.url}`
      : undefined,
      publishedAt: f.publishedAt,
      author: f.author,
      tags: f.tags ?? [],
    };
  });
}

export async function fetchBlogPostBySlug(slug: string) {
  const res = await contentful.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  const item: any = res.items[0];
  if (!item) return null;

  const f = (item.fields || {}) as BlogPostFields & { coverImage?: any };
  return {
    title: f.title,
    slug: f.slug,
    excerpt: f.excerpt,
    coverImageUrl: (f as any)?.coverImage?.fields?.file?.url
      ? `https:${(f as any).coverImage.fields.file.url}`
      : undefined,
    body: (f as any).body,
    publishedAt: f.publishedAt,
    author: f.author,
    tags: f.tags ?? [],
    seoTitle: f.seoTitle ?? f.title,
    seoDescription: f.seoDescription ?? f.excerpt,
  };
}

export async function fetchEvents() {
  const res = await contentful.getEntries({
    content_type: "event",
    // Order primarily by date coming from the API
    order: ["fields.date"],
    limit: 100,
  });

  const items = res.items.map((e: any) => {
    const f = (e.fields || {}) as EventFields;
    return {
      id: e.sys.id as string,
      title: f.title,
      date: f.date,
      time: f.time,
      location: f.location,
      status: f.status,
      description: f.description,
      ticketLink: f.ticketLink,
      featured: Boolean(f.featured),
      sortOrder: (f.sortOrder ?? (f as any).integer ?? 0) as number,
      category: f.category,
      showOnHomepage: (f as any).showOnHomepage ?? true,
      isPrestigious: Boolean((f as any).isPrestigious),
      sectionOrder: (f as any).sectionOrder ?? 0,
    };
  });

  // Client-side tie-breaker: sort by sortOrder (if provided), then by date
  items.sort((a, b) => {
    const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return items;
}


export async function fetchGalleryImages(limit = 100) {
  const res = await contentful.getEntries({
    content_type: "galleryImage",
    order: ["fields.sortOrder", "fields.title"],
    limit,
  });

  return res.items.map((e: any, index: number) => {
    const f = (e.fields || {}) as GalleryImageFields;
    const fileUrl = (f as any)?.image?.fields?.file?.url;
    return {
      id: (e.sys?.id as string) ?? String(index),
      title: f.title,
      altText: f.altText ?? f.title,
      url: fileUrl ? `https:${fileUrl}` : "",
      sortOrder: f.sortOrder ?? 0,
      showOnHomepage: (f as any)?.showOnHomepage ?? true,
    };
  });
}


