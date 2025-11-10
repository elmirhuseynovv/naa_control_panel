import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TableElementProps } from "@/types/types";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<TableElementProps[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/posts");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { ...postsQuery, deletePost };
};
