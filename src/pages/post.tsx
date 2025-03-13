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

// Register languages with SyntaxHighlighter
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  relatedPosts: number[];
}

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
  likes: number;
}

function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // 블로그 포스트 데이터 (실제로는 API에서 가져오는 것이 좋습니다)
  const posts = [
    {
      id: 1,
      title: "프론트엔드 개발의 미래",
      excerpt:
        "React, Vue, Svelte 등 현대 프레임워크의 발전 방향과 앞으로의 전망에 대해 알아봅니다.",
      date: "2025년 3월 10일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      content: `
# 프론트엔드 개발의 미래

프론트엔드 개발 생태계는 지난 몇 년간 급격한 변화를 겪었습니다. React, Vue, Angular와 같은 프레임워크가 웹 개발의 표준이 되었고, 이제 Svelte, Solid 같은 컴파일러 기반 프레임워크도 주목받고 있습니다.

## 현대 프론트엔드 트렌드

### 1. 컴파일러 기반 프레임워크의 부상

Svelte와 Solid.js는 런타임에 가상 DOM을 사용하는 대신 빌드 타임에 최적화된 코드를 생성합니다. 이 접근 방식은 더 작은 번들 크기와 더 나은 성능을 제공할 수 있습니다.
 

### 2. 메타프레임워크의 시대

Next.js, Nuxt, SvelteKit과 같은 메타프레임워크는 라우팅, 서버 사이드 렌더링, 정적 사이트 생성 등 웹 애플리케이션 개발에 필요한 모든 기능을 제공합니다.

### 3. 웹 컴포넌트의 재부상

웹 컴포넌트는 프레임워크에 의존하지 않는 재사용 가능한 컴포넌트를 만들 수 있게 해줍니다. Lit와 같은 라이브러리는 웹 컴포넌트 개발을 더 쉽게 만들어주고 있습니다.

## 앞으로의 전망

프론트엔드 개발의 미래는 더 나은 성능, 개발자 경험, 그리고 사용자 경험을 향해 나아갈 것입니다. 서버 컴포넌트, 점진적 향상, 그리고 AI 기반 개발 도구가 미래의 주요 트렌드가 될 것으로 예상됩니다.

\`\`\`javascript
// 예시 코드: React 서버 컴포넌트
// server-component.js
export default async function ServerComponent() {
  const data = await fetchData();
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}
\`\`\`
      `,
      author: {
        name: "박지민",
        avatar: "https://i.ibb.co/VYL6Dqw5/Kakao-Talk-20240108-231202711.png",
        bio: "신입 프론트엔드 개발자. React와 TypeScript를 주로 사용합니다.",
      },
      relatedPosts: [2, 3],
    },
    {
      id: 2,
      title: "Tailwind CSS로 아름다운 UI 만들기",
      excerpt:
        "Utility-first CSS 프레임워크인 Tailwind CSS를 활용해 효율적으로 디자인하는 방법을 소개합니다.",
      date: "2025년 3월 5일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896",
      content: `
# Tailwind CSS로 아름다운 UI 만들기

Tailwind CSS는 utility-first 접근 방식을 사용하는 CSS 프레임워크로, 미리 정의된 클래스를 조합하여 디자인을 구축합니다. 이 접근 방식은 사용자 정의 CSS를 작성하는 시간을 크게 줄이고 일관된 디자인 시스템을 유지하는 데 도움이 됩니다.
      
## Tailwind CSS의 장점
      
### 1. 생산성 향상
      
미리 정의된 클래스를 사용하면 CSS 파일을 오가는 대신 HTML에서 직접 스타일을 적용할 수 있습니다.
       
      
### 2. 일관된 디자인 시스템
      
Tailwind는 색상, 간격, 타이포그래피 등에 대한 일관된 스케일을 제공합니다.
      
### 3. 반응형 디자인 용이성
       
      
## 효과적인 Tailwind CSS 사용법
      
1. **컴포넌트 추출**: 반복되는 UI 패턴은 컴포넌트로 추출하여 재사용성을 높이세요.
2. **@apply 지시문 활용**: 복잡한 클래스 조합은 @apply를 사용해 CSS로 추출할 수 있습니다.
3. **테마 커스터마이징**: tailwind.config.js 파일을 통해 프로젝트에 맞게 테마를 조정하세요.
      
\`\`\`jsx
// 예시: Tailwind CSS로 버튼 컴포넌트 만들기
function Button({ children, primary }) {
  return (
    <button 
     className={\`px-4 py-2 rounded-lg font-medium transition-colors \${
      primary 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }\`}
  >
    {children}
  </button>
);
}
\`\`\`
Tailwind CSS는 처음에는 HTML이 복잡해 보일 수 있지만, 익숙해지면 UI 개발 속도와 일관성을 크게 향상시킬 수 있습니다.`,
      author: {
        name: "박지민",
        avatar: "https://i.ibb.co/VYL6Dqw5/Kakao-Talk-20240108-231202711.png",
        bio: "신입 프론트엔드 개발자. React와 TypeScript를 주로 사용합니다.",
      },
      relatedPosts: [1, 3],
    },
    {
      id: 3,
      title: "Vite를 활용한 빠른 개발 환경 구축",
      excerpt:
        "Vite의 장점과 최적화된 개발 워크플로우를 구축하는 방법에 대해 알아봅니다.",
      date: "2025년 2월 28일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      content: `
# Vite를 활용한 빠른 개발 환경 구축

Vite는 Evan You(Vue.js 제작자)가 만든 차세대 프론트엔드 도구로, 번들링에 Rollup을 사용하지만 개발 중에는 ESM을 통한 네이티브 ES 모듈을 활용하여 매우 빠른 개발 경험을 제공합니다.

## Vite의 주요 장점

### 1. 빠른 서버 시작

Vite는 애플리케이션 코드를 종속성과 소스 코드로 분할합니다. 종속성은 esbuild(Go로 작성됨)를 통해 사전 번들링되며, 소스 코드는 네이티브 ESM을 통해 제공됩니다.

### 2. 즉각적인 HMR(Hot Module Replacement)

변경 사항이 발생하면 Vite는 변경된 모듈과 해당 모듈에 직접적으로 의존하는 모듈만 다시 로드합니다.

### 3. 다양한 프레임워크 지원

Vite는 React, Vue, Svelte 등 다양한 프레임워크를 위한 공식 템플릿을 제공합니다.

## Vite 프로젝트 시작하기

\`\`\`bash
# React 프로젝트 생성
npm create vite@latest my-app -- --template react-ts

# 의존성 설치
cd my-app
npm install

# 개발 서버 시작
npm run dev
\`\`\`

## Vite 설정 최적화

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
\`\`\`

Vite를 사용하면 개발 서버 시작 시간과 HMR 성능이 크게 향상되어 개발 생산성을 높일 수 있습니다.
      `,
      author: {
        name: "박지민",
        avatar: "https://i.ibb.co/VYL6Dqw5/Kakao-Talk-20240108-231202711.png",
        bio: "신입 프론트엔드 개발자. React와 TypeScript를 주로 사용합니다.",
      },
      relatedPosts: [1, 2],
    },
  ];

  // 샘플 댓글 데이터
  const sampleComments = [
    {
      id: 1,
      content:
        "정말 유익한 글이네요! Svelte와 Solid 같은 컴파일러 기반 프레임워크에 대해 더 알고 싶어요.",
      date: "2025년 3월 11일",
      likes: 5,
    },
    {
      id: 2,
      content:
        "서버 컴포넌트가 앞으로 어떻게 발전할지 궁금합니다. 더 자세한 예시가 있으면 좋겠어요.",
      date: "2025년 3월 11일",
      likes: 3,
    },
    {
      id: 3,
      content:
        "메타프레임워크들 간의 차이점도 다루어주시면 좋을 것 같아요! Next.js와 Remix의 비교 같은 내용이요.",
      date: "2025년 3월 12일",
      likes: 2,
    },
  ];

  useEffect(() => {
    // 포스트 ID로 해당 포스트 데이터 찾기
    const foundPost = posts.find((p) => p.id === parseInt(postId as string));
    if (foundPost) {
      setPost(foundPost);
      // 페이지 타이틀 설정
      document.title = `${foundPost.title} | MinLog`;
      // 포스트에 맞는 댓글 데이터 설정 (실제로는 API에서 가져올 것)
      setComments(sampleComments);
    }
    setLoading(false);
  }, [postId]);

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
      likes: 0,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  // 댓글 좋아요 함수
  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-indigo-600 text-lg">로딩 중...</div>
          </div>
        ) : post ? (
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
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-12">
                <div className="flex items-center text-sm text-indigo-600 mb-3">
                  <span className="px-3 py-1 bg-indigo-100 rounded-full">
                    {post.category}
                  </span>
                  <span className="mx-3">•</span>
                  <span>{post.date}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                  {post.title}
                </h1>
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-600">{post.author.bio}</p>
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
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-8">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    글쓴이: {post.author.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.author.bio}</p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
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
                    <div className="mt-4 flex items-center">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span>{comment.likes}</span>
                      </button>
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

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">관련 글</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {post.relatedPosts.map((relatedId) => {
                    const relatedPost = posts.find((p) => p.id === relatedId);
                    return relatedPost ? (
                      <Link
                        to={`/post/${relatedPost.id}`}
                        key={relatedPost.id}
                        className="flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="w-1/3">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="text-xs text-indigo-600 mb-1">
                            {relatedPost.category}
                          </div>
                          <h3 className="font-bold mb-1 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
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
