import { LanguageSelector } from "./LanguageSelector";
import { SwitchLanguageButton } from "./SwitchLanguageButton";

export const LanguageSelectionContainer = () => {
    return (
        <div className="join m-2 items-center gap-0.5">
            <LanguageSelector isLanguageTranslatedFrom />
            <SwitchLanguageButton />
            <LanguageSelector isLanguageTranslatedFrom={false} />
        </div>
    );
};
