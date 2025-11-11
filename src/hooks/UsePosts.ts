import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TableElementProps } from "@/types/types";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<TableElementProps[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://naa-api-2.onrender.com/posts");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`https://naa-api-2.onrender.com/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const addPost = useMutation({
    mutationFn: async (newPost: TableElementProps) => {
      const res = await fetch("https://naa-api-2.onrender.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("Failed to add post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async (updatedPost: TableElementProps) => {
      const res = await fetch(
        `https://naa-api-2.onrender.com/posts/${updatedPost.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );
      if (!res.ok) throw new Error("Failed to update post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { ...postsQuery, deletePost, addPost, updatePost };
};
