import { createContext } from "react";

export interface SEOState {
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
}

interface SEOContextType {
  setPageMetadata: (data: SEOState) => void;
}

export const SEOContext = createContext<SEOContextType | undefined>(undefined);
