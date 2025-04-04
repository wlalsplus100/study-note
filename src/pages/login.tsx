import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import { useLogin } from "../hooks/useLogin";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, data } = useLogin(email, password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("어드민 로그인 시도:", email);
    mutate();
  };

  useEffect(() => {
    if (data?.data) {
      localStorage.setItem("accessToken", data.data.access_token);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />

      <main className="container min-h-full px-4 pt-24 pb-12 mx-auto grow">
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-sm mx-auto"
          >
            <h1 className="mb-4 text-3xl font-extrabold text-center text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text">
              관리자 로그인
            </h1>

            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="관리자 이메일"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="관리자 비밀번호"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center w-full py-2 mt-6 font-medium text-white transition-shadow rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg"
                >
                  로그인
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminLoginPage;
