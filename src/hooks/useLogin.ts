import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../apis/login";

export const useLogin = (email: string, password: string) => {
  return useMutation({
    mutationKey: ["login", email, password],
    mutationFn: () => postLogin({ email, password }),
    onError: () => {
      alert("아이디와 비밀번호를 확인해주세요");
    },
  });
};
