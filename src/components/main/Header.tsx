import { useStore } from "../../store/useStore.ts";

const Header = () => {
  const currentSC = useStore((state) => state.saveCount);
  return (
    <header className="w-screen h-20 bg-blue-500">
      Saved Stuff: {currentSC}{" "}
    </header>
  );
};

export default Header;
