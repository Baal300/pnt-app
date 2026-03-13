import { useTranslation } from "../../hooks/useTranslation";
import SwapIcon from "../../assets/swap_icon.svg?react";

export const SwitchLanguageButton = () => {
    const {
        sourceLanguage,
        targetLanguage,
        setSourceLanguage,
        setTargetLanguage,
    } = useTranslation();

    const handleLanguageSwitch = () => {
        const previousSourceLanguage = sourceLanguage;
        setSourceLanguage(targetLanguage);
        setTargetLanguage(previousSourceLanguage);
    };

    return (
        <button
            className="mx-0.5 cursor-pointer px-3 py-1 active:translate-y-[0.5px]"
            onClick={handleLanguageSwitch}
        >
            <SwapIcon className="dark:fill-white" />
        </button>
    );
};
