import { useEffect, useState } from "react";
import { InfoBox } from "./components/InfoBox";
import { PokemonGallery } from "./components/PokemonGallery";
import { RegionSelector } from "./components/RegionSelector";
import { LanguageSelector } from "./components/LanguageSelector";
import { SuggestionsList } from "./components/SuggestionsList";
import type {
  Pokemon,
  PokemonDataResponse,
  PokemonName,
  Region,
  SpeciesData,
} from "./types";
import {
  fetchPokemonNames,
  fetchPokemonByRegion,
  fetchPokemonDetails,
  fetchSpeciesDetails,
  translatePokemonName,
} from "./utils/api";
import germanPokemonNames from "./data/pkmn_german.json";
import regionsData from "./data/regions.json";
import { Header } from "./components/Header";
import { NameSearchBar } from "./components/NameSearchBar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const regions: Region[] = regionsData as Region[];
const germanPokemonNamesList: Pokemon[] = germanPokemonNames as Pokemon[];

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PokemonDataResponse | null>();
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [pokemonList, setPokemonList] = useState<
    { number: number; name: PokemonName; image: string }[]
  >([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [translatedLanguage, setTranslatedLanguage] = useState("de");
  const [regionIndex, setRegionIndex] = useState<number>(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPokemonNames()
      .then(setPokemonNames)
      .catch((error) => {
        console.error("Error fetching Pokémon names:", error);
        setPokemonNames([]);
      });
  }, []);

  useEffect(() => {
    async function fetchPokemon() {
      const results = await fetchPokemonByRegion(
        regions[regionIndex].start,
        regions[regionIndex].end,
      );
      const details = await Promise.all(
        results.map(async (poke: { name: string; url: string }) => {
          const pokemonData = await fetchPokemonDetails(poke.url);
          const speciesData: SpeciesData = await fetchSpeciesDetails(
            pokemonData.species.url,
          );

          // Extract names in different languages
          const english = speciesData.names.find(
            (n) => n.language.name === "en",
          );
          const japanese = speciesData.names.find(
            (n) => n.language.name === "roomaji",
          );
          const german = speciesData.names.find(
            (n) => n.language.name === "de",
          );

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
      setPokemonList(details);
    }
    fetchPokemon();
  }, [regionIndex]);

  useEffect(() => {
    if (translatedLanguage === "en") {
      setPokemonNames(germanPokemonNamesList.map((poke) => poke.name));
    } else if (translatedLanguage === "de") {
      fetchPokemonNames()
        .then(setPokemonNames)
        .catch((error) => {
          console.error("Error fetching Pokémon names:", error);
          setPokemonNames([]);
        });
    }
  }, [translatedLanguage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const matches = pokemonNames.filter(
        (name) => name && name.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(matches.slice(0, 10)); // Show up to 10 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (highlightedIndex >= 0 && e.key === "Enter") {
      handleNameEntered(suggestions[highlightedIndex]);
      setHighlightedIndex(-1);
    } else if (e.key === "Enter") {
      handleNameEntered(input);
      setHighlightedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleNameEntered = (name: string) => {
    setInput(name);
    setSuggestions([]);
    if (name.length > 0) {
      setIsLoading(true);
      try {
        translatePokemonName(name, translatedLanguage, API_URL)
          .then(setResult)
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.error("Error translating Pokémon name:", error);
        setResult(null);
        setIsLoading(false);
      }
    } else {
      setResult(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-app-background dark:bg-app-background-dark flex min-h-screen flex-col items-center justify-center p-4">
        <NameSearchBar
          input={input}
          onInputChange={handleInputChange}
          onNameEntered={handleNameEntered}
          onKeyDown={handleKeyDown}
        />
        <SuggestionsList
          suggestions={suggestions}
          nameEnteredHandler={handleNameEntered}
          highlightedIndex={highlightedIndex}
        />
        <LanguageSelector
          translatedLanguage={translatedLanguage}
          setTranslatedLanguage={setTranslatedLanguage}
        />
        <button
          className="m-1 rounded-2xl border border-blue-700 bg-blue-500 p-2 px-4 hover:cursor-pointer hover:bg-blue-400 active:bg-blue-300"
          onClick={() => {
            setTranslatedLanguage((prev) => (prev === "en" ? "de" : "en"));
          }}
        >
          Switch
        </button>

        <InfoBox pokemonData={result} isLoading={isLoading} />

        <RegionSelector regions={regions} setRegionIndex={setRegionIndex} />

        <h2 className="mt-8 mb-4 text-2xl font-bold">Pokémon Gallery</h2>
        <h3 className="mb-2 text-lg font-semibold">
          {regions[regionIndex].name}
        </h3>
        <PokemonGallery pokemonList={pokemonList} />
      </main>
    </>
  );
}

export default App;
