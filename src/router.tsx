import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./pages/blog";
import App from "./App";
import BlogPost from "./pages/post";
import Projects from './pages/projects';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:postId" element={<BlogPost />} />
        <Route path='/projects' element={<Projects />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
