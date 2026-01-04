import { createContext } from "react";

export interface SEOState {
  title?: string;
  description?: string;
  image?: string;
}

interface SEOContextType {
  setPageMetadata: (data: SEOState) => void;
}

export const SEOContext = createContext<SEOContextType | undefined>(undefined);
