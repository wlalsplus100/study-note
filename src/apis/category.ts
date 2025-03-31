import { Category } from "../types/category";
import instance from "./axios";

export const getCategories = async () => {
  const response = await instance.get<Category[]>("categories");
  return response;
};

export const getCategory = async (id: string) => {
  const response = await instance.get<Category>(`categories/${id}`);
  return response;
};
