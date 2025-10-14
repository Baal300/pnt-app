import { useState, type ReactNode } from "react";
import { TranslationContext } from "../contexts/TranslationContext";

type TranslationProviderProps = {
  children: ReactNode;
};

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("de");

  return (
    <TranslationContext.Provider
      value={{
        fromLanguage,
        toLanguage,
        setFromLanguage,
        setToLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
