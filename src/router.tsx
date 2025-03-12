import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./pages/blog";
import App from "./App";
import BlogPost from "./pages/post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:postId" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
