import { useStore } from "../../store/useStore.ts";

const Header = () => {
  const currentSC = useStore((state) => state.saveCount);
  return (
    <header className="w-full h-20 bg-blue-500 flex items-center justify-center text-white font-bold">
      Saved Stuff: {currentSC}{" "}
    </header>
  );
};

export default Header;
