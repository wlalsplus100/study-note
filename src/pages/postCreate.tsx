import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useCategories } from "../hooks/useCategory";
import { usePostPost } from "../hooks/usePost";

function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { data: categoryData } = useCategories();
  const categoriesData = categoryData?.data;
  const { mutate, isSuccess, isError } = usePostPost(
    title,
    "67d8b916906962172a188a33",
    selectedCategory,
    content,
    thumbnail as File,
    new Date().toDateString()
  );

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 인증되지 않은 사용자는 블로그 페이지로 리다이렉트
      navigate("/blog");
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  // 썸네일 파일 변경 처리
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return null; // 인증 체크 중이거나 인증되지 않은 경우 렌더링하지 않음
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !selectedCategory || !thumbnail) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-transparent bg-clip-text">
              새 포스트 작성
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              여러분의 생각과 지식을 공유해보세요.
            </p>
          </motion.div>
        </section>

        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <form onSubmit={handleSubmit}>
                {/* 제목 입력 */}
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="포스트 제목을 입력하세요"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* 카테고리 선택 */}
                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    카테고리
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">카테고리 선택</option>
                    {categoriesData?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 썸네일 업로드 */}
                <div className="mb-6">
                  <label
                    htmlFor="thumbnail"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    썸네일 이미지
                  </label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail"
                      className="flex items-center justify-center py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-600">
                          클릭하여 이미지 업로드
                        </span>
                      </div>
                    </label>
                    {thumbnailPreview && (
                      <div className="mt-2">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="h-40 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 내용 입력 */}
                <div className="mb-8">
                  <label
                    htmlFor="content"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    내용
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="포스트 내용을 입력하세요"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-48"
                    rows={12}
                    required
                  />
                </div>

                {/* 버튼 섹션 */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/blog")}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-70"
                  >
                    포스트 저장
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PostCreatePage;
