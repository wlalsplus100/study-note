import { motion } from "framer-motion";
import Footer from "../components/footer";
import Header from "../components/header";
import SkillBadge from "../components/skillBadge";

function AboutPage() {
  // 개인 정보
  const personalInfo = {
    name: "박지민",
    title: "프론트엔드 개발자",
    bio: "최선의 결과를 추구하지만, 최악에 대비하기 위해 꼼꼼히 확인하는 프론트엔드 개발자가 되기 위해 노력하고 있습니다. \n비즈니스 로직과 업무 도메인을 이해하고, 무엇이 중요한지 알아내기 위해 노력합니다.",
    location: "대전, 대한민국",
    email: "jiminelp@gmail.com",
    github: "github.com/wlalsplus100",
  };

  // 학력 정보
  const education = {
    university: "대덕소프트웨어마이스터고등학교",
    major: "소프트웨어개발과",
    graduation: "재학중",
  };

  // 취미 정보
  const hobbies = [
    {
      name: "게임",
      description: "steam을 이용한 다양한 장르의 게임을 즐깁니다.",
      icon: "🎮",
    },
    {
      name: "베이스 연주",
      description: "베이스 기타를 연주하며 음악적 감수성을 키웁니다.",
      icon: "🎸",
    },
    {
      name: "작문",
      description:
        "시, 소설, 수필 등을 작성하며 생각을 글로 표현하는 것을 즐깁니다.",
      icon: "✍️",
    },
    {
      name: "개발",
      description: "주로 프론트엔드 단에서 개발하는 것을 즐깁니다.",
      icon: "🧑‍💻",
    },
  ];

  // 기술 스택
  const skills = [
    { name: "JavaScript", level: 95, category: "언어" },
    { name: "TypeScript", level: 90, category: "언어" },
    { name: "HTML", level: 95, category: "마크업" },
    { name: "CSS", level: 90, category: "스타일링" },
    { name: "React", level: 95, category: "프레임워크" },
    { name: "Next.js", level: 85, category: "프레임워크" },
    { name: "Redux", level: 70, category: "상태관리" },
    { name: "Tailwind CSS", level: 95, category: "스타일링" },
    { name: "Vite", level: 80, category: "빌드도구" },
    { name: "Git", level: 70, category: "버전관리" },
    { name: "RESTful API", level: 85, category: "백엔드 통신" },
    { name: "emotion", level: 85, category: "스타일링" },
    { name: "styled-components", level: 85, category: "스타일링" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* 소개 섹션 */}
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-transparent bg-clip-text">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {personalInfo.bio}
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-shadow"
              >
                연락하기
              </a>
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
              >
                GitHub 방문하기
              </a>
            </div>
          </motion.div>
        </section>

        {/* 스킬 섹션 */}
        <section className="py-16 bg-white rounded-3xl shadow-lg mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">기술 스택</h2>

            {/* 카테고리별 스킬 그룹화 */}
            {Array.from(new Set(skills.map((skill) => skill.category))).map(
              (category) => (
                <div key={category} className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-700 mb-6">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <SkillBadge
                          key={skill.name}
                          skill={skill}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* 학력 및 경력 섹션 */}
        <section className="py-16 bg-white rounded-3xl shadow-lg mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              학력 및 경력
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">학력</h3>
                <div className="mb-4">
                  <h4 className="font-medium text-indigo-600">
                    {education.university}
                  </h4>
                  <p className="text-gray-700">{education.major} 전공</p>
                  <p className="text-gray-500">
                    졸업년도: {education.graduation}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">경력</h3>
                <div className="mb-4">
                  <h4 className="font-medium text-indigo-600">엔트리</h4>
                  <p className="text-gray-700">프론트엔드 엔지니어</p>
                  <p className="text-gray-500">2024년 - 현재</p>
                  <p className="text-gray-600 mt-2">
                    React와 TypeScript를 활용한 서비스 개발 및 디버깅 작업 수행
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 취미 섹션 */}
        <section className="py-16 bg-white rounded-3xl shadow-lg mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              취미 및 관심사
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md text-center"
                >
                  <div className="text-4xl mb-4">{hobby.icon}</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {hobby.name}
                  </h3>
                  <p className="text-gray-600">{hobby.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              함께 일해요!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              새로운 프로젝트나 협업 기회에 대해 언제든지 연락주세요.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-shadow"
              >
                이메일 보내기
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
