import { create } from "zustand";

type UseStore = {
  saveCount:number;
  increment:() => void;
  decrement:() => void;
}

export const useStore = create<UseStore>((set) => ({
  saveCount: 0,
  increment: () => set((state) => ({ saveCount: state.saveCount + 1 })),
  decrement: () => set((state) => ({ saveCount: state.saveCount - 1 })),
}));
