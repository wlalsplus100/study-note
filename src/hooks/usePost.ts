import { useMutation, useQuery } from "@tanstack/react-query";
import { getPost, getPosts, postPost } from "../apis/post";

export const usePosts = () => {
  return useQuery({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });
};

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getPost", id],
    queryFn: () => getPost(id),
  });
};

export const usePostPost = (
  title: string,
  owner_id: string,
  category_id: string,
  content_markdown: string,
  featured_image: File,
  published_at: string
) => {
  return useMutation({
    mutationKey: ["postPost"],
    mutationFn: () =>
      postPost({
        title,
        owner_id,
        category_id,
        content_markdown,
        featured_image,
        published_at,
      }),
  });
};
