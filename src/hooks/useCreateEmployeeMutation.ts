import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import type { UseEmployeesArg,CreateEmployeePayload } from '../types/employee';


export const useCreateEmployeeMutation = ({api,key}: UseEmployeesArg) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload:CreateEmployeePayload ) => {
          const res = await axios.post(api,payload);
          return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:key})
        }
    })
    
}