import { Uploads } from "../types/uploads";
import instance from "./axios";

export const imgUpload = async (img: File) => {
  const formData = new FormData();
  formData.append("file", img);
  const response = await instance.post<Uploads>("uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};
