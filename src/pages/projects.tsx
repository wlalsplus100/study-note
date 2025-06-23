import { motion } from "framer-motion";
import Footer from "../components/footer";
import Header from "../components/header";
import { useProject } from "../hooks/useProject";

function Projects() {
  const { data: projectData } = useProject();
  const projects = projectData?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
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
              프로젝트 포트폴리오
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
              지금까지 진행한 다양한 개발 프로젝트들을 소개합니다. 기술 스택과
              과정을 공유합니다.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <a
                href="https://github.com/wlalsplus100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-3 font-medium text-white transition-shadow rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                깃허브 방문하기
              </a>
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden transition-shadow bg-white dark:bg-gray-800 shadow-md rounded-2xl hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="overflow-hidden h-60">
                    <img
                      src={
                        project?.thumbnail?.startsWith("/")
                          ? `${import.meta.env.VITE_BASE_URL.slice(0, -1)}${
                              project.thumbnail
                            }`
                          : project.thumbnail
                      }
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        기술 스택
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-white transition-colors bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        코드 보기
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        데모 보기
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

export default Projects;
