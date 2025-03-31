import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
// Import language support - add additional languages as needed
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { usePost } from "../hooks/usePost";
import { useOwner } from "../hooks/useOwner";

// Register languages with SyntaxHighlighter
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

// Type definition for code block props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // Make children optional with ? mark
  [key: string]: any;
}

// Comment interface
interface Comment {
  id: number;
  content: string;
  date: string;
}

function BlogPost() {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { data: postData } = usePost(postId);
  const { data: ownerData } = useOwner(postData?.data.owner_id._id || "");
  const post = postData?.data;

  // 새 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      content: newComment,
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
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
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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

              <div className="rounded-xl overflow-hidden h-96 mb-8">
                <img
                  src={`http://localhost:3004${post.featured_image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-12">
                <div className="flex items-center text-sm text-indigo-600 mb-3">
                  <span className="px-3 py-1 bg-indigo-100 rounded-full">
                    {post.category_id.name}
                  </span>
                  <span className="mx-3">•</span>
                  <span>{post.createdAt.slice(0, 10)}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                  {post.title}
                </h1>
                <div className="flex items-center">
                  <img
                    src={`http://localhost:3004${post.owner_id.profile_image}`}
                    alt={post.owner_id.username}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {post.owner_id.username}
                    </p>
                    <p className="text-sm text-gray-600">{ownerData?.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
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
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-bold mt-5 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="my-4" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-8 my-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-8 my-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-indigo-300 pl-4 italic text-gray-700 my-4"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-indigo-600 hover:text-indigo-800 underline"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table
                        className="min-w-full border-collapse border border-gray-300"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-gray-300 bg-gray-100 px-4 py-2 text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-6 border-t border-gray-300" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      className="max-w-full h-auto rounded my-4"
                      {...props}
                    />
                  ),
                }}
              >
                {post.content_markdown}
              </ReactMarkdown>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-8">
                <img
                  src={`http://localhost:3004${post.owner_id.profile_image}`}
                  alt={post.owner_id.username}
                  className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    글쓴이: {post.owner_id.username}
                  </h3>
                  <p className="text-gray-600 mb-4">{ownerData?.bio}</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/wlalsplus100"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="mt-16 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold mb-6">댓글</h2>

              {/* 댓글 목록 */}
              <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-3">
                            익명
                          </div>
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-800">{comment.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 댓글 입력 폼 */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">댓글 작성</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 작성해주세요"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors resize-none h-32"
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    등록하기
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * 댓글은 익명으로 등록됩니다
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              포스트를 찾을 수 없습니다
            </h2>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800">
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
