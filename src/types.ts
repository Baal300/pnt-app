export type PokemonName = {
  english: string;
  german: string;
  japanese: string;
};

export type PokemonDataResponse = {
  original: string;
  translated: string;
  image: string;
  error?: string;
};

export type SpeciesData = {
  names: { language: { name: string }; name: string }[];
};

export type Pokemon = {
  number: number;
  name: string;
};

export type Region = {
  name: string;
  start: number;
  end: number;
};

export type PokemonDetails = {
  number: number;
  name: PokemonName;
  image: string;
};
