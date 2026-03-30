import Modal from "react-modal";
import { DataCard } from "./DataCard";
import type { PokeAPIPokemon, PokeApiPokemonSpecies } from "../../types/types";
import { useEffect, useState } from "react";
import { fetchPokemonDetailsById, fetchSpeciesDetails } from "../api/api";
import { TypeBadge } from "./TypeBadge";

type PokemonInfoModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    pokemonId: number | undefined;
};

export const PokemonInfoModal = ({
    isOpen,
    onRequestClose,
    pokemonId,
}: PokemonInfoModalProps) => {
    const [pokemonData, setPokemonData] = useState<PokeAPIPokemon | null>(null);
    const [pokemonSpeciesData, setPokemonSpeciesData] =
        useState<PokeApiPokemonSpecies | null>(null);

    useEffect(() => {
        const fetchData = async (pokemonId: number) => {
            try {
                // Fetch Pokemon from PokeAPI
                const pokemonData = await fetchPokemonDetailsById(pokemonId);
                setPokemonData(pokemonData);

                if (pokemonData) {
                    // Fetch species from PokeAPI
                    const speciesData = await fetchSpeciesDetails(
                        pokemonData.species.url,
                    );
                    setPokemonSpeciesData(speciesData);
                }
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        if (pokemonId) {
            fetchData(pokemonId);
        }
    }, [pokemonId]);

    const entryText = pokemonSpeciesData?.flavor_text_entries
        .find((entry) => entry.language.name === "en")
        ?.flavor_text.replace(/\f/g, " "); // Replace form feed characters with spaces from response data

    return (
        <Modal
            isOpen={isOpen}
            className="fixed top-20 right-10 bottom-20 left-10 m-auto max-w-4xl"
            contentLabel="Pokémon details"
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            style={{
                overlay: {
                    zIndex: 1,
                },
            }}
        >
            <div className="grid h-full w-full grid-cols-1 justify-items-center gap-4 overflow-auto bg-teal-700 p-3 outline-6 outline-green-300 sm:grid-cols-2 sm:grid-rows-2">
                <button className="btn" onClick={onRequestClose}>
                    CLOSE
                </button>
                <div className="flex w-full flex-row items-center justify-center">
                    <img
                        src={pokemonData?.sprites.front_default}
                        alt={pokemonData?.species.name}
                        className="xs:h-64 xs:w-64 h-48 w-48 border-2 border-green-400 bg-amber-100 outline-1"
                    />
                </div>
                <DataCard title={"Pokédex Data"}>
                    <article>
                        <p className="pt-1 pr-2 pb-1 pl-2 text-xl font-bold">
                            #{pokemonData ? pokemonData.id : null}
                        </p>
                    </article>
                    <article>
                        <h3 className="pt-1 pr-2 pb-1 pl-2 text-lg font-bold">
                            TYPES
                        </h3>
                        <div className="m-2">
                            {pokemonData
                                ? pokemonData.types.map((slot) => (
                                      <TypeBadge
                                          key={slot.type.name}
                                          typeName={slot.type.name}
                                      />
                                  ))
                                : null}
                        </div>
                    </article>
                </DataCard>
                <DataCard title={"Entry Text"}>
                    <p className="pt-1 pr-2 pb-1 pl-2">{entryText}</p>
                </DataCard>
            </div>
        </Modal>
    );
};
