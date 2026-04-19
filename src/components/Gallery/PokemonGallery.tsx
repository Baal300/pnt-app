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
        <>
            {isLoading ? (
                <PokemonGallerySkeleton />
            ) : (
                <div className="gallery">{pokemonCards}</div>
            )}
        </>
    );
};
