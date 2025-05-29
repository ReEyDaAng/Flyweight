import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLeft } from "./api";
import { TreeType } from "./types";

export function useForestLeftMutation() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload: { count: number; type: TreeType }) => {
      await apiLeft.post("/createTrees", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (count: number) => {
      await apiLeft.delete(`/removeTrees?count=${count}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest"] });
    },
  });

  return { createMutation, removeMutation };
}
