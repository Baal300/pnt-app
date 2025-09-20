import React from "react";

type LanguageSelectorProps = {
  translatedLanguage: string;
  setTranslatedLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const LanguageSelector = ({
  translatedLanguage,
  setTranslatedLanguage,
}: LanguageSelectorProps) => {
  return (
    <select
      className="mb-2 rounded border p-2"
      value={translatedLanguage}
      onChange={(e) => setTranslatedLanguage(e.target.value)}
    >
      <option value="de">{"EN -> DE"}</option>
      <option value="en">{"DE -> EN"}</option>
    </select>
  );
};
