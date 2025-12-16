import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query';
import type { UserList,UseEmployeesArg } from '../types/employee';
import axios from 'axios';

export const useEmployees = ({key,api}:UseEmployeesArg) => {
    const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await axios.get(api);
      console.log("API status:", response.status);
      console.log("API response:", response.data);
      if (!Array.isArray(response.data)) return []; // დაცვა
      return response.data as UserList[];
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`${api}/${id}`);
    },
    onSuccess: () => {
      console.log("removed user Clementine Bauch");
      queryClient.invalidateQueries({ queryKey: key});
    },
  });
  return {isLoading,error,data,mutation}
}