import { useQuery } from "@tanstack/react-query";
import { getProject } from "../apis/project";

export const useProject = () => {
  return useQuery({
    queryKey: ["getProject"],
    queryFn: getProject,
  });
};
