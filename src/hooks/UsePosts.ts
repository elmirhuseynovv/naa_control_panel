import { useQuery } from "@tanstack/react-query";
import type { TableElementProps } from "@/types/types";

export const usePosts = () => {
  return useQuery<TableElementProps[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/posts");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });
};
