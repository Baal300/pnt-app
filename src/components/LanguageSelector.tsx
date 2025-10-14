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

  const selectedLanguage = isLanguageTranslatedFrom ? fromLanguage : toLanguage;

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isLanguageTranslatedFrom) {
      setFromLanguage(e.target.value);
    } else {
      setToLanguage(e.target.value);
    }
  };

  return (
    <select
      className="mb-2 rounded border p-2"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option value="de">{"German"}</option>
      <option value="en">{"English"}</option>
    </select>
  );
};
