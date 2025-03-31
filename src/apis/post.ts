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
  owner_id,
  category_id,
  content_markdown,
  featured_image,
  published_at,
}: PostPost) => {
  const imgurl = (await imgUpload(featured_image)).url;
  const response = await instance.post("posts", {
    title,
    owner_id,
    category_id,
    content_markdown,
    featured_image: imgurl,
    published_at,
  });
  return response;
};
