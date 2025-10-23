import { ToggleDarkModeButton } from "./ToggleDarkModeButton";

export const Header = () => {
  return (
    <header className="navbar bg-primary drop-shadow-xl">
      <h1 className="text-primary-content flex-1 justify-center text-lg font-bold sm:text-3xl">
        Pokémon Name Translator
      </h1>
      <ToggleDarkModeButton className="flex-none" />
    </header>
  );
};
