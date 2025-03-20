import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./pages/blog";
import App from "./App";
import BlogPost from "./pages/post";
import Projects from "./pages/projects";
import AboutPage from "./pages/about";
import AdminLoginPage from "./pages/login";
import PostCreatePage from "./pages/postCreate";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:postId" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
