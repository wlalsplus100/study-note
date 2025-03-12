import { motion } from "framer-motion";
import "./App.css";
import PostPreview from "./components/postPreview";
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  const posts = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-transparent bg-clip-text">
              지금까지 공부했던 많은 것들
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              교과내용 정리, 프론트엔드 정리 그 외 잡다한 이야기를 모두
              다룹니다.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-shadow">
                최신 글 보기
              </button>
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">최신 포스트</h2>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                모든 글 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostPreview post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
