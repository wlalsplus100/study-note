import { Github, Insta } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h2 className="text-xl font-bold text-white">MinLog</h2>
            </div>
            <p className="text-gray-400 dark:text-gray-300 mb-4">
              교과내용 정리, 프론트엔드 정리 <br />그 외 잡다한 이야기를 모두
              다룹니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ballcirclejimin/"
                className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
              >
                <Insta />
              </a>
              <a
                href="https://www.github.com/wlalsplus100"
                className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
              >
                <Github />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">카테고리</h3>
            <ul className="space-y-2 h-[100px] flex flex-col flex-wrap">
              <li>
                <a
                  href="/blog?category=국어"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  국어
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=수학"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  수학
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=사회"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  사회
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=과학"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  과학
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=개발"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  개발
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=잡담"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  잡담
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              유용한 링크
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  소개
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors"
                >
                  프로젝트
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">연락처</h3>
            <p className="text-gray-400 dark:text-gray-300 mb-2">
              궁금한 점이나 협업 제안은 언제든지 연락주세요.
            </p>
            <a
              href="mailto:jiminelp@dsm.hs.kr"
              className="text-indigo-400 dark:text-indigo-300 hover:text-indigo-300 dark:hover:text-indigo-200 transition-colors"
            >
              jiminelp@dsm.hs.kr
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-300">
          <p>© 2025 MinLog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
