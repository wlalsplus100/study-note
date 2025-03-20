import { useQuery } from "@tanstack/react-query";
import { getOwner } from "../apis/owner";

export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ["getOwner", id],
    queryFn: () => getOwner(id),
  });
};
