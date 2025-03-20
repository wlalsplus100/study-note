import { Project } from "../types/project";
import instance from "./axios";

export const getProject = async () => {
  const response = await instance.get<Project[]>("projects");
  return response;
};
