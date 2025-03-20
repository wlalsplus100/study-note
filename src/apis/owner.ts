import { Owner } from "../types/owner";
import instance from "./axios";

export const getOwner = async (id: string) => {
  const response = await instance.get<Owner>(`blog-owners/${id}`);
  return response.data;
};
