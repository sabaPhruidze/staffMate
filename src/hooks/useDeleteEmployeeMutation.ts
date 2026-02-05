import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { UseEmployeesArg } from "../types/employee";

export const useDeleteEmployeeMutation = ({ api, key }: UseEmployeesArg) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${api}/${id}`);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: key, type: "active" });
    },
  });
};
