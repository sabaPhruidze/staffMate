import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DataType } from "../../types/employee";
import { useCreateEmployeeMutation } from "../../hooks/useCreateEmployeeMutation";

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
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="w-full h-35rem mt-20 flex flex-col bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none mb-2"
              />
              {errors[item.register] && (
                <p className="text-red-500 text-xs mt-1 font-medium flex items-center">
                  {String(errors[item.register]?.message)}
                </p>
              )}
            </div>
          ))}
        </fieldset>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default CreateEmployeeForm;
