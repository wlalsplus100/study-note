import { motion } from "framer-motion";
import "./App.css";
import PostPreview from "./components/postPreview";
import Footer from "./components/footer";
import Header from "./components/header";
import { useEffect } from "react";
import { usePosts } from "./hooks/usePost";
import { useProject } from "./hooks/useProject";

function App() {
  const { data: postData } = usePosts();
  const posts = postData?.data;
  const { data: projectData } = useProject();
  const projects = projectData?.data;

  useEffect(() => {
    console.log(posts);
    console.log(projects);
  }, [posts, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-4 text-4xl font-extrabold text-transparent md:text-6xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text">
              지금까지 공부했던 많은 것들
            </h1>
            <p className="mb-8 text-xl text-gray-600 md:text-2xl">
              교과내용 정리, 프론트엔드 정리 그 외 잡다한 이야기를 모두
              다룹니다.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <button className="px-8 py-3 font-medium text-white transition-shadow rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg">
                최신 글 보기
              </button>
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-800">최신 포스트</h2>
              <a
                href="/blog"
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                모든 글 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
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

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts &&
                posts.map((post, index) => (
                  <PostPreview key={post.id} post={post} index={index} />
                ))}
            </div>
          </div>
        </section>

        <section className="py-16 mb-16 bg-white shadow-lg rounded-3xl">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-800">프로젝트</h2>
              <a
                href="/projects"
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                모든 프로젝트 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
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

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects?.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden transition-shadow shadow-md bg-gradient-to-br from-white to-gray-50 rounded-xl hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL.slice(0, -1)}${project.thumbnail}`}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-indigo-600"
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
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-indigo-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-1"
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
