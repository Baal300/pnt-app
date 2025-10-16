type PokemonGalleryProps = {
  pokemonList: {
    number: number;
    name: { english: string; german: string; japanese: string };
    image: string;
  }[];
};

export const PokemonGallery = ({ pokemonList }: PokemonGalleryProps) => (
  <div className="xs:grid-cols-3 grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-7">
    {pokemonList.map((poke) => (
      <div
        key={poke.number}
        className="mb-2 flex w-28 flex-col items-center text-center text-sm"
      >
        <img
          src={poke.image}
          alt={poke.name.english}
          className="h-24 w-24 border-1 bg-amber-100"
        />
        <span className="mt-1 font-bold">#{poke.number}</span>
        <span className="mt-0.25 font-bold">{poke.name.english} (EN)</span>
        <span className="mt-0.25 font-bold">{poke.name.german} (DE)</span>
        <span className="mt-0.25 font-bold">{poke.name.japanese} (JP)</span>
      </div>
    ))}
  </div>
);
