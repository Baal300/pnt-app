import { useTranslation } from "../hooks/useTranslation";

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
    <button className="btn" onClick={handleLanguageSwitch}>
      {"<-->"}
    </button>
  );
};
