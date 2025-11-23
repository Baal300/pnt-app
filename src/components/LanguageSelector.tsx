import { type ChangeEvent } from "react";
import { useTranslation } from "../hooks/useTranslation";

type LanguageSelectorProps = {
    isLanguageTranslatedFrom: boolean;
};

export const LanguageSelector = ({
    isLanguageTranslatedFrom,
}: LanguageSelectorProps) => {
    const { fromLanguage, toLanguage, setFromLanguage, setToLanguage } =
        useTranslation();

    const selectedLanguage = isLanguageTranslatedFrom
        ? fromLanguage
        : toLanguage;

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (isLanguageTranslatedFrom) {
            setFromLanguage(e.target.value);
            if (e.target.value === toLanguage) {
                // Swap languages if they are the same
                setToLanguage(fromLanguage);
            }
        } else {
            setToLanguage(e.target.value);
            if (e.target.value === fromLanguage) {
                // Swap languages if they are the same
                setFromLanguage(toLanguage);
            }
        }
    };

    return (
        <select
            className="select select-lg w-full max-w-xs rounded-xl dark:border-gray-300 dark:bg-gray-700 dark:text-white"
            value={selectedLanguage}
            onChange={handleLanguageChange}
        >
            <option value="de">{"German"}</option>
            <option value="en">{"English"}</option>
        </select>
    );
};
