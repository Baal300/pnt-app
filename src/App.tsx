import { useEffect, useState } from "react";
import { InfoBox } from "./components/InfoBox";
import { PokemonGallery } from "./components/PokemonGallery";
import { RegionSelector } from "./components/RegionSelector";
import { LanguageSelector } from "./components/LanguageSelector";
import type { PokemonDataResponse, PokemonName, SpeciesData } from "./types";
import {
  fetchPokemonByRegion,
  fetchPokemonDetails,
  fetchSpeciesDetails,
  translatePokemonName,
} from "./utils/api";
import { REGIONS } from "./constants/constants";
import { Header } from "./components/Header";
import { NameSearchBar } from "./components/NameSearchBar";
import { TranslateButton } from "./components/TranslateButton";
import { SwitchLanguageButton } from "./components/SwitchLanguageButton";
import { useTranslation } from "./hooks/useTranslation";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const { toLanguage } = useTranslation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PokemonDataResponse | null>();
  const [pokemonList, setPokemonList] = useState<
    { number: number; name: PokemonName; image: string }[]
  >([]);
  const [regionIndex, setRegionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      const results = await fetchPokemonByRegion(
        REGIONS[regionIndex].start,
        REGIONS[regionIndex].end,
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

  const handleTranslateName = (name: string) => {
    setInput(name);
    if (name.length > 0) {
      setIsLoading(true);
      try {
        translatePokemonName(name, toLanguage, API_URL)
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
    <div className="dark:text-primary-content">
      <Header />
      <main className="bg-app-background dark:bg-app-background-dark flex min-h-screen flex-col items-center justify-center p-4">
        <NameSearchBar
          input={input}
          setInput={setInput}
          onTranslateName={handleTranslateName}
        />
        <div className="join m-2 items-center gap-0.5">
          <LanguageSelector isLanguageTranslatedFrom />
          <SwitchLanguageButton />
          <LanguageSelector isLanguageTranslatedFrom={false} />
        </div>
        <TranslateButton input={input} onClick={handleTranslateName} />

        <InfoBox pokemonData={result} isLoading={isLoading} />

        <RegionSelector
          regions={REGIONS}
          setRegionIndex={setRegionIndex}
          regionIndex={regionIndex}
        />

        <h2 className="mt-8 mb-4 text-2xl font-bold">Pokémon Gallery</h2>
        <h3 className="mb-2 text-lg font-semibold">
          {REGIONS[regionIndex].name}
        </h3>
        <PokemonGallery pokemonList={pokemonList} />
      </main>
    </div>
  );
}

export default App;
