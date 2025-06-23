import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { usePost } from "../hooks/usePost";
import { useOwner } from "../hooks/useOwner";
import CommentForm from "../components/CommentForm";
import { getComments } from "../apis/comment";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  node?: {
    type?: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: Array<unknown>;
  };
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Comment interface
interface Comment {
  id: number;
  content: string;
  date: string;
  nickname: string;
}

function BlogPost() {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const { data: postData } = usePost(postId);
  const post = postData?.data;
  const { data: ownerData } = useOwner(post?.owner?.id?.toString() || "");

  // 댓글 목록 불러오기
  const fetchComments = async () => {
    if (!postId) return;
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  // 댓글 작성 성공 시 목록 갱신
  const handleCommentSuccess = () => {
    fetchComments();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        {post ? (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <Link
                  to="/blog"
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  블로그로 돌아가기
                </Link>
              </div>

              <div className="mb-8 overflow-hidden rounded-xl h-96">
                <img
                  src={
                    post.featuredImage
                      ? post.featuredImage.startsWith("http")
                        ? post.featuredImage
                        : `${import.meta.env.VITE_BASE_URL.slice(0, -1)}${
                            post?.featuredImage
                          }`
                      : "/placeholder-image.jpg"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-3 text-sm text-indigo-600 dark:text-indigo-400">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    {post.category?.name || "카테고리 없음"}
                  </span>
                  <span className="mx-3">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="mb-6 text-4xl font-extrabold md:text-5xl text-gray-900 dark:text-gray-100">
                  {post.title}
                </h1>
                <div className="flex items-center">
                  <img
                    src={
                      post.owner?.profileImage
                        ? `${import.meta.env.VITE_BASE_URL.slice(0, -1)}${
                            post?.owner?.profileImage
                          }`
                        : "/default-profile.jpg"
                    }
                    alt={post.owner?.username || "작성자"}
                    className="object-cover w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {post.owner?.username || "작성자"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {ownerData?.bio || ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        // @ts-expect-error - react-syntax-highlighter의 타입 정의 문제로 인한 임시 해결책
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ ...props }) => (
                    <h1 className="mt-8 mb-4 text-3xl font-bold" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="mt-6 mb-3 text-2xl font-bold" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="mt-5 mb-2 text-xl font-bold" {...props} />
                  ),
                  p: ({ ...props }) => <p className="my-4" {...props} />,
                  ul: ({ ...props }) => (
                    <ul className="pl-8 my-4 list-disc" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="pl-8 my-4 list-decimal" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="pl-4 my-4 italic text-gray-700 dark:text-gray-300 border-l-4 border-indigo-300 dark:border-indigo-500"
                      {...props}
                    />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300"
                      {...props}
                    />
                  ),
                  table: ({ ...props }) => (
                    <div className="my-6 overflow-x-auto">
                      <table
                        className="min-w-full border border-collapse border-gray-300 dark:border-gray-600"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="px-4 py-2 text-left bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  hr: ({ ...props }) => (
                    <hr
                      className="my-6 border-t border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  img: ({ ...props }) => (
                    <img
                      className="h-auto max-w-full my-4 rounded"
                      {...props}
                    />
                  ),
                }}
              >
                {post.contentMarkdown}
              </ReactMarkdown>
            </div>

            <div className="pt-8 mt-16 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center p-8 md:flex-row bg-gray-50 dark:bg-gray-800 rounded-xl">
                <img
                  src={
                    post.owner?.profileImage
                      ? `${import.meta.env.VITE_BASE_URL.slice(0, -1)}${
                          post?.owner?.profileImage
                        }`
                      : "/default-profile.jpg"
                  }
                  alt={post.owner?.username || "작성자"}
                  className="object-cover w-24 h-24 mb-4 rounded-full md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-100">
                    글쓴이: {post.owner?.username || "작성자"}
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {ownerData?.bio || ""}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/wlalsplus100"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="pt-8 mt-16 border-t border-gray-200 dark:border-gray-700">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                댓글
              </h2>

              {/* 댓글 목록 */}
              <div className="mb-8 space-y-6">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-auto h-8 mr-3 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            {comment.nickname}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-100">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 댓글 입력 폼 */}
              <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">
                  댓글 작성
                </h3>
                {postId && (
                  <CommentForm
                    postId={postId}
                    onSuccess={handleCommentSuccess}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
              포스트를 찾을 수 없습니다
            </h2>
            <Link
              to="/"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;
