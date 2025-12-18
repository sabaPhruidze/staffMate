import { useMutation,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import type { UseEmployeesArg } from '../types/employee';
import { useStore } from '../store/useStore';

export const useDeleteEmployeeMutation =({api,key}: UseEmployeesArg) => {
    const decrement = useStore(state => state.decrement);
    const counter = useStore(state => state.saveCount);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(id:number) => {
           await axios.delete(`${api}/${id}`);
        },
        onSuccess:() => {
            if(counter > 0) return decrement();
            queryClient.invalidateQueries({queryKey:key});
        }
    })
}