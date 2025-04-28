import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { TreeData } from "@/App";

export function useForestQuery() {
  return useQuery({
    queryKey: ["forest"],
    queryFn: async () => {
      const { data } = await api.get<{ trees: TreeData[]; totalBytes: number }>(
        "/getTrees"
      );
      return data;
    },
  });
}
