import { useTranslation } from "../hooks/useTranslation";
import SwapIcon from "../assets/swap_icon.svg?react";

export const SwitchLanguageButton = () => {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage } =
    useTranslation();

  const handleLanguageSwitch = () => {
    const oldFromLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(oldFromLanguage);
    console.log(`${fromLanguage} ${toLanguage}`);
  };

  return (
    <button
      className="bg-app-background dark:bg-app-background-dark mx-0.5 cursor-pointer px-3 py-1 active:translate-y-[0.5px]"
      onClick={handleLanguageSwitch}
    >
      <SwapIcon className="dark:fill-white" />
    </button>
  );
};
