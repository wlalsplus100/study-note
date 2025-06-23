import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const menubar = [
  { title: "home", link: "/" },
  { title: "blog", link: "/blog" },
  { title: "projects", link: "/projects" },
  { title: "about", link: "/about" },
];

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menubar.find((item) => item.link === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.title);
    } else if (currentPath === "/") {
      setActiveTab("home");
    }
  }, [location]);

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg fixed w-full top-0 z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              MinLog
            </h1>
          </Link>
        </motion.div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8 relative">
            {menubar.map((tab) => (
              <li key={tab.title} className="relative">
                <Link
                  to={tab.link}
                  className={`block px-2 py-1 text-lg font-medium capitalize transition-colors ${
                    activeTab === tab.title
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                  }`}
                  onClick={() => setActiveTab(tab.title)}
                  onMouseEnter={() => setHoveredTab(tab.title)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  {tab.title}
                  {(activeTab === tab.title && hoveredTab === null) ||
                  hoveredTab === tab.title ? (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <button className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
