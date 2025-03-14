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

  const projects = [
    {
      id: 1,
      title: "동물 이미지 분류 웹 앱",
      description:
        "머신러닝 모델을 활용한 동물 이미지 분류 웹 애플리케이션입니다. 사용자가 업로드한 이미지에서 동물을 인식하고 분류합니다.",
      techStack: ["React", "TensorFlow.js", "Tailwind CSS", "Firebase"],
      githubLink: "https://github.com/wlalsplus100/animal-classifier",
      demoLink: "https://animal-classifier-demo.vercel.app",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    },
    {
      id: 2,
      title: "실시간 협업 노트 애플리케이션",
      description:
        "여러 사용자가 동시에 노트를 작성하고 편집할 수 있는 실시간 협업 노트 애플리케이션입니다. 마크다운 지원 및 자동 저장 기능이 포함되어 있습니다.",
      techStack: ["Next.js", "Socket.io", "MongoDB", "Express", "Tailwind CSS"],
      githubLink: "https://github.com/wlalsplus100/realtime-collab-notes",
      demoLink: "https://collab-notes-demo.vercel.app",
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1",
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
                href="/blog"
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
                <PostPreview key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white rounded-3xl shadow-lg mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">프로젝트</h2>
              <a
                href="/projects"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                모든 프로젝트 보기
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
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
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
