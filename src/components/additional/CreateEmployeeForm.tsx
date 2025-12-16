import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DataType } from "../../types/employee";

const validationSchema = z.object({
  name: z.string(),
  email: z.string(),
  company_name: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const CreateEmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });
  const onSubmit = () => {
    console.log("uploaded");
  };

  const DATA: DataType[] = [
    { id: 1, label: "Name", register: "name" },
    { id: 2, label: "Email", register: "email" },
    { id: 3, label: "Company name", register: "company_name" },
  ];
  return (
    <section className="w-full h-96 mt-20 flex flex-col">
      <h2>Employee Registration</h2>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Register your employees here</legend>
          {DATA.map((item) => (
            <div key={item.id}>
              <label htmlFor={item.register}>{item.label}</label>
              <input
                id={item.register}
                type="text"
                {...register(item.register)}
              />
              {errors[item.register] && (
                <p>{String(errors[item.register]?.message)}</p>
              )}
            </div>
          ))}
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default CreateEmployeeForm;
