import { createContext } from "react";

export type TranslationContextType = {
    sourceLanguage: string;
    targetLanguage: string;
    setSourceLanguage: (lang: string) => void;
    setTargetLanguage: (lang: string) => void;
};

export const TranslationContext = createContext<
    TranslationContextType | undefined
>(undefined);
