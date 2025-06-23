import axios from "./axios";

export interface CreateCommentDto {
  nickname: string;
  content: string;
  postId: number;
}

export const createComment = async (dto: CreateCommentDto) => {
  const { data } = await axios.post("/comments", dto);
  return data;
};

export const getComments = async (postId?: string) => {
  const params = postId ? { post: postId } : {};
  const { data } = await axios.get("/comments", { params });
  return data;
};