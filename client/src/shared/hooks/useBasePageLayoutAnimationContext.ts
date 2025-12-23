import { useContext } from "react";
import { BasePageLayoutAnimationContext } from "../../context/BasePageLayoutAnimationContext/BasePageLayoutAnimationContext";

export const useBasePageLayoutAnimationContext = () => {
  const context = useContext(BasePageLayoutAnimationContext);
  if (!context) {
    throw new Error(
      "useBasePageLayoutAnimationContext must be used within a BasePageLayout"
    );
  }
  return context;
};
