import { useMemo } from "react";
import type { PokemonCardData } from "../../types/types";

import { PokemonCard } from "./PokemonCard";
import { PokemonGallerySkeleton } from "./PokemonGallerySkeleton";

type PokemonGalleryProps = {
    pokemonList: PokemonCardData[];
    isLoading?: boolean;
    regionName: string;
};

export const PokemonGallery = ({
    pokemonList,
    isLoading = false,
}: PokemonGalleryProps) => {
    const pokemonCards = useMemo(() => {
        return pokemonList.map((poke) => (
            <PokemonCard key={poke.number} pokemonInfo={poke} />
        ));
    }, [pokemonList]);

    return (
        <div>
            {isLoading ? (
                <PokemonGallerySkeleton />
            ) : (
                <div className="mx-1 grid w-full grid-cols-[repeat(auto-fill,_minmax(10.5rem,_1fr))] justify-center justify-items-center gap-x-3 gap-y-1 md:grid-cols-[repeat(4,_10.5rem)] lg:grid-cols-[repeat(5,_10.5rem)] xl:grid-cols-[repeat(6,_10.5rem)]">
                    {pokemonCards}
                </div>
            )}
        </div>
    );
};
