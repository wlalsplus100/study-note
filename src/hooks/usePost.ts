import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "../apis/post";

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
