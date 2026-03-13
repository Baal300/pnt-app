import { useEffect, useState } from "react";
import { useTranslation } from "./useTranslation";
import { fetchPokemonNames } from "../components/api/api";
import {
    POKEMON_NAMES_DE,
    POKEMON_NAMES_FR,
    POKEMON_NAMES_JA_HRKT,
    POKEMON_NAMES_JA_ROMA,
} from "../constants/constants";

export const useSearch = () => {
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { sourceLanguage } = useTranslation();

    // Fetch pokemon names
    useEffect(() => {
        if (sourceLanguage === "en") {
            fetchPokemonNames()
                .then(setPokemonNames)
                .catch((error) => {
                    console.error("Error fetching Pokémon names:", error);
                    setPokemonNames([]);
                });
        } else if (sourceLanguage === "de") {
            setPokemonNames(POKEMON_NAMES_DE.map((poke) => poke.name));
        } else if (sourceLanguage === "fr") {
            setPokemonNames(POKEMON_NAMES_FR.map((poke) => poke.name));
        } else if (sourceLanguage === "ja-hrkt") {
            setPokemonNames(POKEMON_NAMES_JA_HRKT.map((poke) => poke.name));
        } else if (sourceLanguage === "ja-roma") {
            setPokemonNames(POKEMON_NAMES_JA_ROMA.map((poke) => poke.name));
        } else {
            setPokemonNames([]);
        }
    }, [sourceLanguage]);

    return {
        pokemonNames,
        suggestions,
        setSuggestions,
    };
};
