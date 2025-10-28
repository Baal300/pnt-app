import type { Pokemon, Region } from "../types/types";
import germanPokemonNames from "../data/pkmn_german.json";
import regionsData from "../data/regions.json";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const REGIONS: Region[] = regionsData as Region[];
export const GERMAN_POKEMON_NAMES: Pokemon[] = germanPokemonNames as Pokemon[];
