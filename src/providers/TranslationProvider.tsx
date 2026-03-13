import { useState, type ReactNode } from "react";
import { TranslationContext } from "../contexts/TranslationContext";

type TranslationProviderProps = {
    children: ReactNode;
};

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
    const [sourceLanguage, setSourceLanguage] = useState("en");
    const [targetLanguage, setTargetLanguage] = useState("de");

    return (
        <TranslationContext.Provider
            value={{
                sourceLanguage: sourceLanguage,
                targetLanguage: targetLanguage,
                setSourceLanguage: setSourceLanguage,
                setTargetLanguage: setTargetLanguage,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};
