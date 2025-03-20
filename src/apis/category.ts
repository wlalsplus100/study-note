import { Category } from "../types/category";
import instance from "./axios";

export const getCategory = async () => {
  const response = await instance.get<Category[]>("categories");
  return response;
};
