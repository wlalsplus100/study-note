import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import PostPreview from "../components/postPreview";
import Footer from "../components/footer";
import Header from "../components/header";
import { usePosts } from "../hooks/usePost";
import { Post } from "../types/post";

function BlogPage() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>([]);
  const [allPosts, setAllposts] = useState<Post[] | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = usePosts();

  useEffect(() => {
    setAllposts(data?.data);
  }, [data]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
      console.log(!!token);
    };

    checkAuthStatus();

    // 로컬 스토리지 변경 감지를 위한 이벤트 리스너
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // 모든 카테고리 추출
  const categories = [
    "all",
    ...new Set(
      allPosts
        ?.filter((post) => post.category?.name)
        .map((post) => post.category.name)
    ),
  ];

  // 포스트 필터링 함수
  useEffect(() => {
    let result = allPosts && [...allPosts];

    // 카테고리 필터링
    if (activeCategory !== "all") {
      result = result?.filter((post) => post.category?.name === activeCategory);
    }

    // 검색어 필터링
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result?.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.category?.name.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(result ?? []);
  }, [activeCategory, searchQuery, allPosts]);

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
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 flex justify-end"
              >
                <Link
                  to="/post/create"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  포스트 추가
                </Link>
              </motion.div>
            )}

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
