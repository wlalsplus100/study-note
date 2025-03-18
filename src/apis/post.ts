import { Post } from "../types/post";
import instance from "./axios";

export const getPosts = async () => {
  const response = await instance.get<Post[]>("posts");
  return response;
};

export const getPost = async (id: string | undefined) => {
  const response = await instance.get<Post>(`posts/${id}`);
  return response;
};
