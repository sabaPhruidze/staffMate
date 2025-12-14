import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserList {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const EmployeeList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data as UserList[];
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
        Error
      </div>
    );
  const tableHeader = ["Name", "Email", "Company"];

  return (
    <div className="flex flex-col justify-center items-center h-[30rem] bg-white rounded-3xl shadow-lg overflow-y-auto p-6">
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
                {item.company.name}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
