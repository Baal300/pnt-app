import pkmnUI from "../asset/Pkmn_ruby_ui.png";
import type { PokemonDataResponse } from "../types";

type InfoBoxProps = {
  pokemonData?: PokemonDataResponse | null;
  isLoading?: boolean;
};

export const InfoBox = ({ pokemonData, isLoading }: InfoBoxProps) => {
  let pokemonName = pokemonData?.translated || "";
  if (pokemonData === null) {
    pokemonName = "Can't find Pokémon";
  }

  return (
    <div
      className="relative flex h-[651px] w-[356px]"
      style={{
        backgroundImage: `url(${pkmnUI})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 top-[150px] flex justify-center">
        {pokemonData?.image && !isLoading && (
          <img
            src={pokemonData.image}
            alt={pokemonData.translated}
            className="h-[256px] w-[256px] object-contain"
          />
        )}
      </div>
      <p className="absolute top-[450px] left-0 w-full text-center text-lg font-semibold">
        {pokemonName}
      </p>
      {isLoading && (
        <div className="absolute inset-0 top-[200px] my-4 flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-3 border-b-3 border-t-red-500 border-b-white"></div>
          <span className="ml-2 text-blue-500">Translating...</span>
        </div>
      )}
    </div>
  );
};
