import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "@/services/contentful";

export const useGalleryImages = () =>
  useQuery({
    queryKey: ["galleryImages"],
    queryFn: () => fetchGalleryImages(),
    staleTime: 60_000,
  });


