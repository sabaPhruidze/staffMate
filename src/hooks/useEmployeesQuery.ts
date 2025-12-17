import {useQuery} from "@tanstack/react-query"
import axios from 'axios';
import type { UserList,UseEmployeesArg } from "../types/employee";

export const useEmployeesQuery = ({key , api}: UseEmployeesArg) => {
 return useQuery({
    queryKey:key,
    queryFn: async() => {
        const {data} = await axios.get(api);
         return data as UserList[]
    }
 })
}