import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

export function useForestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { count: number; type: string }) => {
      await api.post("/createTrees", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest"] });
    },
  });
}
