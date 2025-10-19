import type { PokemonDataResponse } from "../types";

export async function fetchPokemonNames(): Promise<string[]> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species?limit=10000",
  );
  const data = await res.json();
  if (!data.results) throw new Error("Failed to fetch Pokémon names");
  return data.results.map((poke: { name: string }) => poke.name);
}

export async function fetchPokemonByRegion(start: number, end: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${end - start + 1}&offset=${start - 1}`,
  );

  if (!res.ok) {
    throw new Error(
      `Error fetching Pokémon by region: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  return data.results;
}

export async function fetchPokemonDetails(pokeUrl: string) {
  const res = await fetch(pokeUrl);
  return await res.json();
}

export async function fetchSpeciesDetails(speciesUrl: string) {
  const res = await fetch(speciesUrl);
  return await res.json();
}

export const fetchMusic = async (API_URL: string) => {
  const res = await fetch(`${API_URL}/api/music/1`);
  return createAudioObjectURL(res);
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
