import { type ChangeEvent } from "react";
import { useTranslation } from "../../hooks/useTranslation";

type LanguageSelectorProps = {
    isLanguageTranslatedFrom: boolean;
};

export const LanguageSelector = ({
    isLanguageTranslatedFrom,
}: LanguageSelectorProps) => {
    const {
        sourceLanguage,
        targetLanguage,
        setSourceLanguage,
        setTargetLanguage,
    } = useTranslation();

    const selectedLanguage = isLanguageTranslatedFrom
        ? sourceLanguage
        : targetLanguage;

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (isLanguageTranslatedFrom) {
            setSourceLanguage(e.target.value);
            if (e.target.value === targetLanguage) {
                // Swap languages if they are the same
                setTargetLanguage(sourceLanguage);
            }
        } else {
            setTargetLanguage(e.target.value);
            if (e.target.value === sourceLanguage) {
                // Swap languages if they are the same
                setSourceLanguage(targetLanguage);
            }
        }
    };

    return (
        <select
            className="select select-lg max-w-32 min-w-28 rounded-xl text-sm dark:border-gray-300 dark:bg-gray-700 dark:text-white"
            value={selectedLanguage}
            onChange={handleLanguageChange}
        >
            <option value="en">{"English"}</option>
            <option value="fr">{"French"}</option>
            <option value="de">{"German"}</option>
            <option value="ja-hrkt">{"Japanese"}</option>
            <option value="ja-roma">{"JP (Romaji)"}</option>
        </select>
    );
};
