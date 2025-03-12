import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

interface PropsType {
  post: Post;
  index: number;
}

const PostPreview = ({ post, index }: PropsType) => {
  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={`${post.image}?w=600&auto=format&q=75`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-indigo-600 transition-colors">
          <a href="#">{post.title}</a>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <a
          href="#"
          className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
        >
          더 읽기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
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
