type PokemonGalleryProps = {
  pokemonList: {
    number: number;
    name: { english: string; german: string; japanese: string };
    image: string;
  }[];
};

export const PokemonGallery = ({ pokemonList }: PokemonGalleryProps) => (
  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
    {pokemonList.map((poke) => (
      <div key={poke.number} className="mb-2 flex flex-col items-center">
        <img
          src={poke.image}
          alt={poke.name.english}
          className="h-32 w-32 border-1 bg-amber-100"
        />
        <span className="mt-1 font-bold">#{poke.number}</span>
        <span className="mt-1 font-bold">{poke.name.english} (EN)</span>
        <span className="mt-1 font-bold">{poke.name.german} (DE)</span>
        <span className="mt-1 font-bold">{poke.name.japanese} (JP)</span>
      </div>
    ))}
  </div>
);
