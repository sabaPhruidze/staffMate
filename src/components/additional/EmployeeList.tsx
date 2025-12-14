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
        "https://jsonplaceholder.typicode.com/usersf"
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: UserList) => (
            <tr className="shadow-md, rounded-lg, hover:scale-105 transition">
              <td> {item.name} </td>
              <td> {item.email} </td>
              <td> {item.company.name} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
