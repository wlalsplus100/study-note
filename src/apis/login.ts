import { Login } from "../types/login";
import instance from "./axios";

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await instance.post<Login>("auth/login", {
    email: email,
    password: password,
  });
  return response;
};
