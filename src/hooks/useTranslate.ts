import { useState } from "react";
import type { PokemonDataResponse } from "../types";
import { translatePokemonName } from "../utils/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


// TODO: use hook in TranslateButton component
export const useTranslate = () => {
  const [result, setResult] = useState<PokemonDataResponse | null>(null);

  const translate = async (
    name: string,
    language: string,
  ): Promise<PokemonDataResponse | null> => {
    if (name.length > 0) {
      try {
        setResult(await translatePokemonName(name, language, API_URL));
      } catch (error) {
        console.error("Error translating Pokémon name:", error);
        setResult(null);
      }
    } else {
      setResult(null);
    }

    return result;
  };

  return { translate };
};
