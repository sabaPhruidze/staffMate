import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DataType } from "../../types/employee";
import { useCreateEmployeeMutation } from "../../hooks/useCreateEmployeeMutation";
import { useEmployeeStore } from "../../store/useStore";

const validationSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.email({ message: "Email is not correct" }),
  company_name: z.string().min(2, { message: "Name is too short" }),
});
const DATA: DataType[] = [
  { id: 1, label: "Name", register: "name" },
  { id: 2, label: "Email", register: "email" },
  { id: 3, label: "Company name", register: "company_name" },
];
//fwefwef
type ValidationSchema = z.infer<typeof validationSchema>;

const CreateEmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });
  const createMutation = useCreateEmployeeMutation({
    key: ["employeeList"],
    api: "/api/employees",
  });
  const onSubmit = (values: ValidationSchema) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        useEmployeeStore.getState().fetchEmployees(); // increment might be false in case of dublicate or error so added this here as well
        reset();
      },
    });
  };

  return (
    <section className=" mt-10 w-full h-35rem flex flex-col bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-10">
        Employee Registration
      </h2>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="text-sm text-gray-500 mb-6">
            Register your employees here
          </legend>
          {DATA.map((item) => (
            <div key={item.id}>
              <label
                htmlFor={item.register}
                className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer"
              >
                {item.label}
              </label>
              <input
                id={item.register}
                type="text"
                {...register(item.register)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none my-2"
              />
              {errors[item.register] && (
                <p className="text-red-500 text-xs font-medium flex items-center mb-1">
                  {String(errors[item.register]?.message)}
                </p>
              )}
            </div>
          ))}
        </fieldset>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 mt-2"
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default CreateEmployeeForm;
