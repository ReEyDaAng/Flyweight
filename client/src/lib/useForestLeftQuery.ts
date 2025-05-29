import { useQuery } from "@tanstack/react-query";
import { apiLeft } from "./api";
import { TreeData } from "@/App";

export function useForestLeftQuery() {
  return useQuery({
    queryKey: ["forest"],
    queryFn: async () => {
      const { data } = await apiLeft.get<{
        trees: TreeData[];
        totalBytes: number;
      }>("/getTrees");
      return data;
    },
  });
}
