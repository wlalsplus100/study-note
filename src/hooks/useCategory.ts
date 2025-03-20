import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../apis/category";

export const useCategory = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategory,
  });
};
