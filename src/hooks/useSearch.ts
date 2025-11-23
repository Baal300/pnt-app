import { useEffect, useState } from "react";
import { useTranslation } from "./useTranslation";
import { fetchPokemonNames } from "../utils/api";
import { GERMAN_POKEMON_NAMES } from "../constants/constants";

export const useSearch = () => {
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { fromLanguage } = useTranslation();

    // Fetch pokemon names
    useEffect(() => {
        if (fromLanguage === "en") {
            fetchPokemonNames()
                .then(setPokemonNames)
                .catch((error) => {
                    console.error("Error fetching Pokémon names:", error);
                    setPokemonNames([]);
                });
        } else if (fromLanguage === "de") {
            setPokemonNames(GERMAN_POKEMON_NAMES.map((poke) => poke.name));
        }
    }, [fromLanguage]);

    return {
        pokemonNames,
        suggestions,
        setSuggestions,
    };
};
