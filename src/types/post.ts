export interface Post {
  id: number;
  title: string;
  contentMarkdown: string;
  contentHtml?: string;
  featuredImage?: string;
  viewCount: number;
  publishedAt?: Date;
  owner: {
    id: number;
    username: string;
    profileImage?: string;
    bio?: string;
  };
  category: {
    id: number;
    name: string;
    description?: string;
  };
  comments?: {
    id: number;
    nickname: string;
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPost {
  title: string;
  contentMarkdown: string;
  contentHtml?: string;
  featuredImage: File;
  ownerId: number;
  categoryId: number;
  publishedAt?: Date;
}
