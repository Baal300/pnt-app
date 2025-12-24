import { useMemo } from "react";
import type { PokemonInfoData } from "../../types/types";

import { PokemonCard } from "./PokemonCard";
import { PokemonGallerySkeleton } from "./PokemonGallerySkeleton";

type PokemonGalleryProps = {
    pokemonList: PokemonInfoData[];
    isLoading?: boolean;
    regionName: string;
};

export const PokemonGallery = ({
    pokemonList,
    isLoading = false,
    regionName,
}: PokemonGalleryProps) => {
    const pokemonCards = useMemo(() => {
        return pokemonList.map((poke) => (
            <PokemonCard key={poke.number} pokemonInfo={poke} />
        ));
    }, [pokemonList]);

    return (
        <>
            <h2 className="mt-8 mb-4 text-2xl font-bold">Pokémon Gallery</h2>
            <h3 className="mb-2 text-lg font-semibold">{regionName}</h3>
            {isLoading ? (
                <PokemonGallerySkeleton />
            ) : (
                <div className="xs:p-3 lg grid w-full grid-cols-[repeat(auto-fill,_minmax(10.5rem,_1fr))] justify-center gap-x-3 gap-y-1 md:grid-cols-[repeat(4,_10.5rem)] lg:grid-cols-[repeat(5,_10.5rem)] xl:grid-cols-[repeat(6,_10.5rem)]">
                    {pokemonCards}
                </div>
            )}
        </>
    );
};
