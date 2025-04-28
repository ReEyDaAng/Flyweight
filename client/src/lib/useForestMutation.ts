import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { TreeType } from "./types";

export function useForestMutation() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload: { count: number; type: TreeType }) => {
      await api.post("/createTrees", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (count: number) => {
      await api.delete(`/removeTrees?count=${count}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest"] });
    },
  });

  return { createMutation, removeMutation };
}
