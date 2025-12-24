import { useEffect, useState } from "react";
import { TranslationInfoBox } from "./components/Translation/TranslationInfoBox";
import { PokemonGallery } from "./components/Gallery/PokemonGallery";
import { RegionSelector } from "./components/Gallery/RegionSelector";
import type { PokemonDataResponse, PokemonInfoData } from "./types/types";
import {
    extractPokemonInfoData,
    fetchCrySound,
    fetchPokemonByRegion,
    translatePokemonName,
} from "./utils/api";
import { API_URL, REGIONS } from "./constants/constants";
import { Header } from "./components/Header";
import { useTranslation } from "./hooks/useTranslation";
import { MusicPlayer } from "./components/Music/MusicPlayer";
import { ScrollToTopButton } from "./components/UI/ScrollToTopButton";

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
    const [crySoundObjectURL, setSoundObjectURL] = useState<string>("");
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

    const handleTranslateName = async (name: string) => {
        setInput(name);
        if (name.length > 0) {
            setIsLoadingTranslation(true);
            try {
                const result = await translatePokemonName(
                    name,
                    toLanguage,
                    API_URL,
                );
                setResult(result);
                setIsLoadingTranslation(false);

                if (result) {
                    const crySound = await fetchCrySound(
                        result.number,
                        API_URL,
                    );
                    setSoundObjectURL(crySound);
                }
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
                <TranslationInfoBox
                    pokemonData={result}
                    isLoading={isLoadingTranslation}
                    input={input}
                    setInput={setInput}
                    onTranslateName={handleTranslateName}
                    crySoundObjectURL={crySoundObjectURL}
                />

                <div className="divider dark:divider-info"></div>

                <RegionSelector
                    regions={REGIONS}
                    setRegionIndex={setRegionIndex}
                    regionIndex={regionIndex}
                />
                <PokemonGallery
                    pokemonList={pokemonList}
                    isLoading={isLoadingRegion}
                    regionName={REGIONS[regionIndex].name}
                />
            </main>
            <ScrollToTopButton className="fixed right-5 bottom-5 z-10" />
        </div>
    );
}

export default App;
