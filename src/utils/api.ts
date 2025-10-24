import type {
  PokemonDataResponse,
  SpeciesNames,
  PokeAPIResult,
} from "../types";

export async function fetchPokemonNames(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species?limit=10000",
    );

    const data = await res.json();
    if (!data.results) throw new Error("Failed to fetch Pokémon names");
    return data.results.map((poke: { name: string }) => poke.name);
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
    return [];
  }
}

export async function fetchPokemonByRegion(start: number, end: number) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${end - start + 1}&offset=${start - 1}`,
    );

    if (!res.ok) {
      throw new Error(
        `Error fetching Pokémon by region: ${res.status} ${res.statusText}`,
      );
    }
    const data = await res.json();
    const results: PokeAPIResult[] = data.results;
    return results;
  } catch (error) {
    console.error("Error fetching Pokémon by region:", error);
    return [];
  }
}

export async function fetchPokemonDetails(pokeUrl: string) {
  try {
    const res = await fetch(pokeUrl);
    return await res.json();
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    return null;
  }
}

export async function fetchSpeciesDetails(speciesUrl: string) {
  try {
    const res = await fetch(speciesUrl);
    return await res.json();
  } catch (error) {
    console.error("Error fetching species details:", error);
    return null;
  }
}

export const fetchMusic = async (API_URL: string) => {
  try {
    const res = await fetch(`${API_URL}/api/music/1`);
    return createAudioObjectURL(res);
  } catch (error) {
    console.error("Error fetching music:", error);
    return null;
  }
};

const createAudioObjectURL = async (response: Response) => {
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  return audioUrl;
};

export async function translatePokemonName(
  name: string,
  lang: string,
  apiUrl: string,
): Promise<PokemonDataResponse | null> {
  try {
    const res = await fetch(
      `${apiUrl}/api/translate?name=${name}&lang=${lang}`,
    );
    if (!res.ok) {
      throw new Error(`Translation API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
}

export const extractPokemonInfoData = async (pokemonList: PokeAPIResult[]) => {
  return Promise.all(
    pokemonList.map(async (poke) => {
      const pokemonData = await fetchPokemonDetails(poke.url);
      const speciesData: SpeciesNames = await fetchSpeciesDetails(
        pokemonData.species.url,
      );

      // Extract names in different languages
      const english = speciesData.names.find((n) => n.language.name === "en");
      const japanese = speciesData.names.find(
        (n) => n.language.name === "roomaji",
      );
      const german = speciesData.names.find((n) => n.language.name === "de");

      return {
        number: pokemonData.id,
        name: {
          english: english?.name,
          german: german?.name,
          japanese: japanese?.name,
        },
        image: pokemonData.sprites.front_default,
      };
    }),
  );
};
