import { ToggleDarkModeButton } from "./ToggleDarkModeButton";

export const Header = () => {
  return (
    <header className="bg-primary grid w-full grid-cols-5 content-center p-4 align-middle dark:bg-gray-800">
      <h1 className="text-primary-content col-start-2 col-end-5 flex justify-center text-xl font-bold sm:text-3xl dark:text-gray-200">
        Pokémon Name Translator
      </h1>
      <ToggleDarkModeButton className="col-start-5 justify-center" />
    </header>
  );
};
