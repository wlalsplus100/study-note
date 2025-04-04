import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, getPosts, postPost, deletePost } from "../apis/post";

export const usePosts = () => {
  return useQuery({
    queryKey: ["getPosts"],
    queryFn: async () => {
      const response = await getPosts();
      console.log('Posts response:', response);
      return response;
    },
  });
};

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getPost", id],
    queryFn: async () => {
      const response = await getPost(id);
      console.log('Post response:', response);
      return response;
    },
    enabled: !!id
  });
};

export const usePostPost = (
  title: string,
  ownerId: number,
  categoryId: number,
  contentMarkdown: string,
  featuredImage: File,
  publishedAt: Date,
  options?: {
    onSuccess?: () => void;
  }
) => {
  return useMutation({
    mutationKey: ["postPost"],
    mutationFn: () =>
      postPost({
        title,
        ownerId,
        categoryId,
        contentMarkdown,
        featuredImage,
        publishedAt,
      }),
    onSuccess: options?.onSuccess,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
    },
  });
};
