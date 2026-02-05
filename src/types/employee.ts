export interface UserList {
  id: number;
  name: string;
  email: string;
  company_name: string;
}

export interface UseEmployeesArg {
  key:string[];
  api:string;
}

export interface DataType {
    id: number;
    label: string;
    register: "name" | "email" | "company_name";
}
export interface CreateEmployeePayload {
  name: string;
  email: string;
  company_name: string;
};