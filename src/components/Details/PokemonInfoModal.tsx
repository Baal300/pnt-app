import Modal from "react-modal";
import { DataCard } from "./DataCard";
import type { PokeAPIPokemon } from "../../types/types";
import { useEffect, useState } from "react";
import { fetchPokemonDetailsById } from "../api/api";

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
    const [data, setData] = useState<PokeAPIPokemon | null>(null);

    useEffect(() => {
        const fetchData = async (pokemonId: number) => {
            const data = await fetchPokemonDetailsById(pokemonId);
            setData(data);
        };
        if (pokemonId) {
            fetchData(pokemonId);
        }
    }, [pokemonId]);
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
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 justify-items-center gap-4 bg-teal-700 p-3 outline-6 outline-green-300">
                <button className="btn" onClick={onRequestClose}>
                    CLOSE
                </button>
                {/* IMAGE HERE */}
                <DataCard title={"Pokédex number"} data={data} />
                <DataCard title={"Names"} data={data} />
                <DataCard title={"Types"} data={data} />
            </div>
        </Modal>
    );
};
