import { create } from "zustand";
import axios from "axios";
import type { UserList } from "../types/employee";

type UseStore = {
  employees: UserList[];
  fetchEmployees: () => Promise<void>;
  saveCount: number;
  increment: () => void;
  decrement: () => void;
};

export const useEmployeeStore = create<UseStore>((set) => ({
  employees: [],
  saveCount: 0,
  fetchEmployees: async () => {
    const res = await axios.get<UserList[]>("/api/employees");
    const employees = res.data;
    set({
      employees,
      saveCount: employees.length,
    });
  },
  increment: () => set((state) => ({ saveCount: state.saveCount + 1 })),
  decrement: () =>
    set((state) => ({
      saveCount: state.saveCount > 0 ? state.saveCount - 1 : 0,
    })),
}));
