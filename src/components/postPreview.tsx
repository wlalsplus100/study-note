import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/post";
import { useDeletePost } from "../hooks/usePost";

interface PropsType {
  post: Post;
  index: number;
}

const PostPreview = ({ post, index }: PropsType) => {
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePost();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
      deletePost(post.id);
    }
  };

  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden transition-shadow bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:shadow-xl border border-gray-200 dark:border-gray-700"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={
            post.featuredImage
              ? post.featuredImage.startsWith("http")
                ? post.featuredImage
                : `${import.meta.env.VITE_BASE_URL.slice(0, -1)}${
                    post.featuredImage
                  }`
              : "/placeholder-image.jpg"
          }
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            {post.category?.name || "카테고리 없음"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            {isAuthenticated && (
              <button
                onClick={handleDelete}
                className="p-1 text-red-500 dark:text-red-400 transition-colors hover:text-red-700 dark:hover:text-red-300"
                aria-label="포스트 삭제"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
          <a href="#">{post.title}</a>
        </h3>
        <a
          href="#"
          className="inline-flex items-center font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          더 읽기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  );
};

export default PostPreview;
