import type { PokemonInfoData } from "../types";

type PokemonGalleryProps = {
  pokemonList: PokemonInfoData[];
};

export const PokemonGallery = ({ pokemonList }: PokemonGalleryProps) => (
  <div className="xs:grid-cols-3 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7">
    {pokemonList.map((poke) => (
      <div
        key={poke.number}
        className="card border-accent dark:from-start-gradient-dark dark:to-end-gradient-dark from-start-gradient to-end-gradient m-0.5 w-28 flex-col items-center border bg-linear-to-br text-center text-xs sm:m-1 sm:w-32 sm:text-lg"
      >
        <img
          src={poke.image}
          alt={poke.name.english}
          className="border-accent mx-2 mt-3 h-24 w-24 border-1 bg-amber-100"
        />

        <div className="card-body join join-vertical gap-0 p-2 text-shadow-sm">
          <span className="join-item">#{poke.number}</span>
          <span className="join-item font-semibold">
            {poke.name.english || "MISSINGNO"}{" "}
            <span className="text-tiny">(EN)</span>
          </span>
          <span className="join-item font-semibold">
            {poke.name.german || "MISSINGNO"}{" "}
            <span className="text-tiny">(DE)</span>
          </span>
          <span className="join-item font-semibold">
            {poke.name.japanese || "MISSINGNO"}{" "}
            <span className="text-tiny">(JP)</span>
          </span>
        </div>
      </div>
    ))}
  </div>
);
