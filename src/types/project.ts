export interface Project {
  id: number;
  title: string;
  description?: string;
  githubUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  techStack?: string[];
  owner: {
    id: number;
    username: string;
    profileImage?: string;
    bio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
