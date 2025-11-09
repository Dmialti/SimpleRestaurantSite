import { createContext } from "react";

interface CardContextType {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export default CardContext;
