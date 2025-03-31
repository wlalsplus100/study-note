export interface Post {
  _id: string;
  title: string;
  content_markdown: string;
  featured_image: string;
  view_count: number;
  owner_id: {
    _id: string;
    username: string;
    profile_image: string;
  };
  category_id: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostPost {
  title: string;
  content_markdown: string;
  featured_image: File;
  owner_id: string;
  category_id: string;
  published_at: string;
}
