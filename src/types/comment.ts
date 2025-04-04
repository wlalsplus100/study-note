export interface Comment {
  id: number;
  nickname: string;
  content: string;
  post: {
    id: number;
    title: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateComment {
  nickname: string;
  content: string;
  postId: number;
} 