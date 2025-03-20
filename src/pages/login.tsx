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
    data?.data && localStorage.setItem("accessToken", data.data.access_token);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 min-h-full grow">
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-sm mx-auto"
          >
            <h1 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-transparent bg-clip-text">
              관리자 로그인
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1 text-sm"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="관리자 이메일"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-1 text-sm"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="관리자 비밀번호"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-shadow flex justify-center items-center mt-6"
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
