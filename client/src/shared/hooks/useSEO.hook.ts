import { useContext } from "react";
import { SEOContext } from "../../context/SEOContext/SEOContext";

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) throw new Error("useSEO must be used within SEOProvider");
  return context;
};
