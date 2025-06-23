import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../apis/category";

export const useCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["getCategory", id],
    queryFn: () => getCategory(Number(id)),
  });
};
