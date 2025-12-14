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
  isLoading && (
    <div className="flex justify-center align-center text-white font-bold">
      fetching...
    </div>
  );
  error && (
    <div className="flex justify-center items-center text-red-500 font-bold">
      Error
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((item: UserList) => (
        <div className="shadow-md, rounded-lg, hover:scale-105 transition">
          {`${item.name} ${item.email} ${item.company.name}`}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
