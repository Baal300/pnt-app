import { useEffect, useState } from "react";
import { InfoBox } from "./components/InfoBox";
import { PokemonGallery } from "./components/PokemonGallery";
import { RegionSelector } from "./components/RegionSelector";
import { LanguageSelector } from "./components/LanguageSelector";
import type { PokemonDataResponse, PokemonInfoData } from "./types";
import {
  extractPokemonInfoData,
  fetchPokemonByRegion,
  translatePokemonName,
} from "./utils/api";
import { API_URL, REGIONS } from "./constants/constants";
import { Header } from "./components/Header";
import { NameSearchBar } from "./components/NameSearchBar";
import { TranslateButton } from "./components/TranslateButton";
import { SwitchLanguageButton } from "./components/SwitchLanguageButton";
import { useTranslation } from "./hooks/useTranslation";
import { MusicPlayer } from "./components/MusicPlayer";

// Simple in-memory cache for regional Pokémon lists
const MAX_CACHE_SIZE = 10;
const regionCache = new Map<number, PokemonInfoData[]>();
const clearRegionCache = () => {
  regionCache.clear();
};

function App() {
  const { toLanguage } = useTranslation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PokemonDataResponse | null>();
  const [pokemonList, setPokemonList] = useState<PokemonInfoData[]>([]);
  const [regionIndex, setRegionIndex] = useState<number>(0);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [isLoadingRegion, setIsLoadingRegion] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      // Check cache first
      if (regionCache.has(regionIndex)) {
        setPokemonList(regionCache.get(regionIndex)!);
        return;
      }

      setIsLoadingRegion(true);
      try {
        const pokemonList = await fetchPokemonByRegion(
          REGIONS[regionIndex].start,
          REGIONS[regionIndex].end,
        );

        const details = await extractPokemonInfoData(pokemonList);

        if (regionCache.size >= MAX_CACHE_SIZE) {
          const firstKey = regionCache.keys().next().value;
          if (firstKey !== undefined) {
            regionCache.delete(firstKey);
          }
        }
        regionCache.set(regionIndex, details);

        setPokemonList(details);
        setIsLoadingRegion(false);
      } catch (error) {
        console.error("Error fetching Pokémon by region: ", error);
        setPokemonList([]);
        setIsLoadingRegion(false);
        clearRegionCache();
        return;
      }
    };

    fetchPokemon();
  }, [regionIndex]);

  const handleTranslateName = (name: string) => {
    setInput(name);
    if (name.length > 0) {
      setIsLoadingTranslation(true);
      try {
        translatePokemonName(name, toLanguage, API_URL)
          .then(setResult)
          .finally(() => setIsLoadingTranslation(false));
      } catch (error) {
        console.error("Error translating Pokémon name:", error);
        setResult(null);
        setIsLoadingTranslation(false);
      }
    } else {
      setResult(null);
      setIsLoadingTranslation(false);
    }
  };

  return (
    <div className="dark:text-primary-content">
      <Header />
      <main className="bg-app-background dark:bg-app-background-dark from-app-background flex min-h-screen flex-col items-center justify-center p-4">
        <MusicPlayer />
        <InfoBox pokemonData={result} isLoading={isLoadingTranslation} />
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
        <RegionSelector
          regions={REGIONS}
          setRegionIndex={setRegionIndex}
          regionIndex={regionIndex}
        />
        <h2 className="mt-8 mb-4 text-2xl font-bold">Pokémon Gallery</h2>
        <h3 className="mb-2 text-lg font-semibold">
          {REGIONS[regionIndex].name}
        </h3>
        {isLoadingRegion ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <PokemonGallery pokemonList={pokemonList} />
        )}
      </main>
    </div>
  );
}

export default App;
