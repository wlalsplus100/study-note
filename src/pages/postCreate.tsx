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
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { data: categoryData } = useCategories();
  const categoriesData = categoryData?.data;
  const { mutate } = usePostPost(
    title,
    2,
    selectedCategory ?? 1,
    content,
    thumbnail as File,
    new Date(),
    {
      onSuccess: () => {
        navigate("/");
      }
    }
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

      <main className="container px-4 pt-24 pb-12 mx-auto">
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-4 text-4xl font-extrabold text-transparent md:text-5xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text">
              새 포스트 작성
            </h1>
            <p className="mb-8 text-xl text-gray-600">
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
              className="p-8 bg-white shadow-md rounded-xl"
            >
              <form onSubmit={handleSubmit}>
                {/* 제목 입력 */}
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="포스트 제목을 입력하세요"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* 카테고리 선택 */}
                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    카테고리
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => {
                      const category = categoriesData?.find(c => c.id === Number(e.target.value));
                      setSelectedCategory(category?.id);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">카테고리 선택</option>
                    {categoriesData?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 썸네일 업로드 */}
                <div className="mb-6">
                  <label
                    htmlFor="thumbnail"
                    className="block mb-2 font-medium text-gray-700"
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
                      className="flex items-center justify-center py-4 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 mb-2 text-gray-400"
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
                          className="object-cover h-40 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 내용 입력 */}
                <div className="mb-8">
                  <label
                    htmlFor="content"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    내용
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="포스트 내용을 입력하세요"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-48"
                    rows={12}
                    required
                  />
                </div>

                {/* 버튼 섹션 */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/blog")}
                    className="px-6 py-3 font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 font-medium text-white transition-shadow rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg disabled:opacity-70"
                    disabled={!title || !content || !selectedCategory || !thumbnail}
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
