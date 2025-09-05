import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/contentful";

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 60_000,
  });


