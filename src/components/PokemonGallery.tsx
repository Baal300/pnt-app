import type { PokemonInfoData } from "../types/types";

import { PokemonCard } from "./PokemonCard";

type PokemonGalleryProps = {
  pokemonList: PokemonInfoData[];
};

export const PokemonGallery = ({ pokemonList }: PokemonGalleryProps) => (
  <div className="xs:p-3 lg grid w-full grid-cols-[repeat(auto-fill,_minmax(9.25rem,_1fr))] justify-center gap-x-2 gap-y-2 lg:grid-cols-[repeat(7,_minmax(9rem,_11rem))]">
    {pokemonList.map((poke) => (
      <PokemonCard pokemonInfo={poke} />
    ))}
  </div>
);
