import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE ?? "";
interface UserList {
  id: number;
  name: string;
  email: string;
  company_name: string;
}

const EmployeeList = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/api/employees`);
      console.log("API status:", response.status);
      console.log("API response:", response.data);
      if (!Array.isArray(response.data)) return []; // დაცვა
      return response.data as UserList[];
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(
        `${import.meta.env.VITE_API_BASE ?? ""}/api/employees/${id}`
      );
    },
    onSuccess: () => {
      console.log("removed user Clementine Bauch");
      queryClient.invalidateQueries({ queryKey: ["employeeList"] });
    },
  });
  if (isLoading)
    return (
      <div className="flex justify-center align-center text-white font-bold">
        fetching...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-red-500 font-bold">
        {(error as Error).message}
      </div>
    );

  const tableHeader = ["Name", "Email", "Company"];

  return (
    <div className="flex justify-center items-center flex-col block">
      <div className="flex flex-col justify-center items-center h-[30rem] bg-white rounded-3xl shadow-lg overflow-y-auto p-6 w-full">
        <table className="w-full border-separate border-spacing-y-2 border-l-2 border-r-2 border-gray-50">
          <thead className=" bg-gray-50">
            <tr>
              {tableHeader.map((item) => (
                <th
                  className="text-left uppercase text-xs tracking-wider text-gray-600 px-4 py-3 select-none"
                  key={item}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="transition-colors duration-200">
            {data?.map((item: UserList) => (
              <tr
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors duration-200"
                key={item.id}
              >
                <td className="font-medium text-gray-900"> {item.name} </td>
                <td className="text-gray-600"> {item.email} </td>
                <td className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {" "}
                  {item.company_name}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="rounded-lg bg-blue-500 w-72 h-10 mt-10 "
        type="button"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate(2)}
      >
        {mutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default EmployeeList;
