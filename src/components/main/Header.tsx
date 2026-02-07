import { useEmployeeStore } from "../../store/useStore.ts";
import { useEffect } from "react";

const Header = () => {
  const currentSC = useEmployeeStore((state) => state.saveCount);
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees);
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  return (
    <header className="w-full h-20 bg-blue-500 flex items-center justify-center text-white font-bold">
      Saved Stuff: {currentSC}{" "}
    </header>
  );
};

export default Header;
