import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

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

function BlogPost() {
  const [activeTab, setActiveTab] = useState("blog");
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

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

Tailwind CSS는 처음에는 HTML이 복잡해 보일 수 있지만, 익숙해지면 UI 개발 속도와 일관성을 크게 향상시킬 수 있습니다.
      `,
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
 

## Vite 설정 최적화
 

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

  useEffect(() => {
    // 포스트 ID로 해당 포스트 데이터 찾기
    const foundPost = posts.find((p) => p.id === parseInt(postId as string));
    if (foundPost) {
      setPost(foundPost);
      // 페이지 타이틀 설정
      document.title = `${foundPost.title} | MinLog`;
    }
    setLoading(false);
  }, [postId]);

  const renderMarkdown = (markdown: string) => {
    if (!markdown) return "";

    let html = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>'
      );
    return { __html: html };
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
              <div
                dangerouslySetInnerHTML={
                  renderMarkdown(post.content) as { __html: string }
                }
              />
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
