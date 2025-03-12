import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostPreview from "../components/postPreview";
import Footer from "../components/footer";
import Header from "../components/header";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>([]);

  const allPosts = [
    {
      id: 1,
      title: "프론트엔드 개발의 미래",
      excerpt:
        "React, Vue, Svelte 등 현대 프레임워크의 발전 방향과 앞으로의 전망에 대해 알아봅니다.",
      date: "2025년 3월 10일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    },
    {
      id: 2,
      title: "Tailwind CSS로 아름다운 UI 만들기",
      excerpt:
        "Utility-first CSS 프레임워크인 Tailwind CSS를 활용해 효율적으로 디자인하는 방법을 소개합니다.",
      date: "2025년 3월 5일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896",
    },
    {
      id: 3,
      title: "Vite를 활용한 빠른 개발 환경 구축",
      excerpt:
        "Vite의 장점과 최적화된 개발 워크플로우를 구축하는 방법에 대해 알아봅니다.",
      date: "2025년 2월 28일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      id: 4,
      title: "현대 국어의 특성과 변화 양상",
      excerpt:
        "디지털 시대에 국어가 어떻게 변화하고 있는지, 그리고 이러한 변화가 언어 사용에 미치는 영향에 대해 살펴봅니다.",
      date: "2025년 2월 20일",
      category: "국어",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    },
    {
      id: 5,
      title: "수학적 사고방식이 문제 해결에 미치는 영향",
      excerpt:
        "일상에서 마주하는 다양한 문제를 수학적 사고방식으로 접근하는 방법과 그 효과에 대해 알아봅니다.",
      date: "2025년 2월 15일",
      category: "수학",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    },
    {
      id: 6,
      title: "현대 사회의 정치 참여와 민주주의",
      excerpt:
        "디지털 시대의 정치 참여 방식의 변화와 이것이 민주주의에 미치는 영향에 대한 분석입니다.",
      date: "2025년 2월 10일",
      category: "사회",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9",
    },
    {
      id: 7,
      title: "인공지능과 함께하는 교육의 미래",
      excerpt:
        "AI 기술이 교육 현장에 어떻게 적용되고 있으며, 앞으로의 교육 방식이 어떻게 변화할지 전망합니다.",
      date: "2025년 2월 5일",
      category: "잡담",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e",
    },
    {
      id: 8,
      title: "기후 변화와 과학기술의 역할",
      excerpt:
        "지구 온난화에 대응하기 위한 현대 과학기술의 발전과 그 한계에 대해 알아봅니다.",
      date: "2025년 1월 28일",
      category: "과학",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d",
    },
    {
      id: 9,
      title: "React 상태 관리의 모든 것",
      excerpt:
        "Redux, Context API, Recoil 등 다양한 상태 관리 라이브러리의 비교와 적절한 사용 상황을 분석합니다.",
      date: "2025년 1월 20일",
      category: "개발",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    },
  ];

  // 모든 카테고리 추출
  const categories = ["all", ...new Set(allPosts.map((post) => post.category))];

  // 포스트 필터링 함수
  useEffect(() => {
    let result = [...allPosts];

    // 카테고리 필터링
    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory);
    }

    // 검색어 필터링
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(result);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-transparent bg-clip-text">
              블로그 포스트
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              교과내용부터 개발, 그리고 일상까지 다양한 주제의 글을 만나보세요.
            </p>
          </motion.div>
        </section>

        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white rounded-xl shadow-md p-6">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-wrap gap-2 mt-4 md:mt-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      activeCategory === category
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "전체" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <PostPreview post={post} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500 mb-4">
                  다른 키워드나 카테고리로 검색해 보세요.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  모든 글 보기
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogPage;
