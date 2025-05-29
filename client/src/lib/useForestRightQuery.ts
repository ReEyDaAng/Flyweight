import { useQuery } from "@tanstack/react-query";
import { apiRight } from "./api";
import { TreeData } from "@/App";

export function useForestRightQuery() {
  return useQuery({
    queryKey: ["forest-right"],
    queryFn: async () => {
      const { data } = await apiRight.get<{
        trees: TreeData[];
        totalBytes: number;
      }>("/getTrees");
      return data;
    },
  });
}
