import type { Pokemon, Region } from "../types/types";
import pokemonNamesDE from "../data/pkmn_de.json";
import pokemonNamesFR from "../data/pkmn_fr.json";
import pokemonNamesJA_HRKT from "../data/pkmn_ja-hrkt.json";
import pokemonNamesJA_ROMA from "../data/pkmn_ja-roma.json";
import regionsData from "../data/regions.json";

export const API_HOST =
    import.meta.env.VITE_API_HOST || "http://localhost:5000";
export const REGIONS: Region[] = regionsData as Region[];
export const POKEMON_NAMES_DE: Pokemon[] = pokemonNamesDE as Pokemon[];
export const POKEMON_NAMES_FR: Pokemon[] = pokemonNamesFR as Pokemon[];
export const POKEMON_NAMES_JA_HRKT: Pokemon[] =
    pokemonNamesJA_HRKT as Pokemon[];
export const POKEMON_NAMES_JA_ROMA: Pokemon[] =
    pokemonNamesJA_ROMA as Pokemon[];
