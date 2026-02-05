import type { UserList } from "../../types/employee";
import { useDeleteEmployeeMutation } from "../../hooks/useDeleteEmployeeMutation";
import { useEmployeesQuery } from "../../hooks/useEmployeesQuery";

const EmployeeList = () => {
  const { isLoading, error, data } = useEmployeesQuery({
    key: ["employeeList"],
    api: "/api/employees",
  });
  const mutation = useDeleteEmployeeMutation({
    key: ["employeeList"],
    api: "/api/employees",
  });
  if (isLoading)
    return (
      <div className="flex justify-center align-center text-black font-bold m-10">
        fetching...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-red-500 font-bold">
        {(error as Error).message}
      </div>
    );

  const tableHeader = ["Name", "Email", "Company", ""];

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="max-w-[800px] mt-10 flex flex-col justify-center items-center h-[30rem] bg-white rounded-3xl shadow-lg overflow-y-auto p-6 w-full">
        <table className="w-full border-separate border-spacing-y-2 border-l-2 border-r-2 border-gray-50">
          <thead className=" bg-gray-50">
            <tr>
              {tableHeader.map((item, idx) => (
                <th
                  className="text-left uppercase text-xs tracking-wider text-gray-600 px-4 py-3 select-none"
                  key={idx}
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
                <td>
                  <button
                    className="rounded bg-red-500 px-3 py-1 text-white"
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate(item.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
