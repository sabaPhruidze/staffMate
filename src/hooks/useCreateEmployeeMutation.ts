import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import type { UserList,UseEmployeesArg } from '../types/employee';
import type { DataType } from '../types/employee';
export const useCreateEmployeeMutation = ({api,key}: UseEmployeesArg) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (name:DataType ,email:DataType ,company_name:DataType ) => {
          const res = await axios.post(api,payload);
          return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:key})
        }
    })
    
}