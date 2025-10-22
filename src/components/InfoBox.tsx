import PokemonUI from "../assets/Pkmn_ruby_ui.png";
import PokeballImage from "../assets/Poke_Ball_ZA_Art.png";

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
      className="relative flex h-[651px] w-[330px]"
      style={{
        backgroundImage: `url(${PokemonUI})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
      <p className="dark:text-base-content absolute top-[450px] left-0 w-full text-center font-mono text-2xl font-bold">
        {pokemonName}
      </p>
      {isLoading && (
        <div className="absolute inset-0 top-[200px] my-4 flex justify-center">
          <div className="h-32 w-32 animate-spin">
            <img src={PokeballImage} alt="Loading Pokemon"></img>
          </div>
        </div>
      )}
    </div>
  );
};
