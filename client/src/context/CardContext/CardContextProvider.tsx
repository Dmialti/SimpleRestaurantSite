import { useState, type ReactNode } from "react";
import CardContext from "./CardContext";

interface CardContextProviderProps {
  children: ReactNode;
}

const CardContextProvider: React.FC<CardContextProviderProps> = ({
  children,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <CardContext value={{ isHovered, setIsHovered }}>{children}</CardContext>
  );
};

export default CardContextProvider;
