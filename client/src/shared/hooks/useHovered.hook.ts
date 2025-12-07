import { useContext } from "react";
import CardContext from "../../context/CardContext/CardContext";

const useHovered = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useHovered must be used within a CardContextProvider");
  }

  return context;
};

export default useHovered;
