import { useQuery } from "@tanstack/react-query";
import api from "./api";

export function useForestQuery() {
  return useQuery({
    queryKey: ["forest"],
    queryFn: async () => {
      const { data } = await api.get("/getTrees");
      return data;
    },
  });
}
