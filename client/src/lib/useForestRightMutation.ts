import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRight } from "./api";
import { TreeType } from "./types";

export function useForestRightMutation() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload: { count: number; type: TreeType }) => {
      await apiRight.post("/createTrees", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest-right"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (count: number) => {
      await apiRight.delete(`/removeTrees?count=${count}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forest-right"] });
    },
  });

  return { createMutation, removeMutation };
}
