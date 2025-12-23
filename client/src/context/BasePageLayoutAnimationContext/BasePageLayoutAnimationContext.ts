import { createContext } from "react";

interface BasePageLayoutAnimationContextType {
  isHeroAnimationDone: boolean;
  isContentAnimationDone: boolean;
}

export const BasePageLayoutAnimationContext = createContext<
  BasePageLayoutAnimationContextType | undefined
>(undefined);
