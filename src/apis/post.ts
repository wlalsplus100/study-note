import { Post, PostPost } from "../types/post";
import instance from "./axios";
import { imgUpload } from "./upload";

export const getPosts = async () => {
  const response = await instance.get<Post[]>("posts");
  return response;
};

export const getPost = async (id: string | undefined) => {
  const response = await instance.get<Post>(`posts/${id}`);
  return response;
};

export const postPost = async ({
  title,
  ownerId,
  categoryId,
  contentMarkdown,
  featuredImage,
  publishedAt,
}: PostPost) => {
  const imgurl = (await imgUpload(featuredImage)).url;
  const response = await instance.post("posts", {
    title,
    ownerId,
    categoryId,
    contentMarkdown,
    featuredImage: imgurl,
    publishedAt,
  });
  return response;
};

export const deletePost = async (id: number) => {
  const response = await instance.delete(`posts/${id}`);
  return response;
};
