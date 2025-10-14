import { createContext } from "react";

export type TranslationContextType = {
  fromLanguage: string;
  toLanguage: string;
  setFromLanguage: (lang: string) => void;
  setToLanguage: (lang: string) => void;
};

export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);
