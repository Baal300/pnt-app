import type { PokemonInfoData } from "../../types/types";
import GermanyFlag from "../../assets/twemoji_flag-germany.svg?react";
import JapanFlag from "../../assets/twemoji_flag-japan.svg?react";
import UKFlag from "../../assets/twemoji_flag-united-kingdom.svg?react";

type PokemonCardProps = {
    pokemonInfo: PokemonInfoData;
};

export const PokemonCard = ({ pokemonInfo }: PokemonCardProps) => {
    return (
        <div className="hover-3d justify-center">
            <div
                key={pokemonInfo.number}
                className="card border-accent dark:from-start-gradient-dark dark:to-end-gradient-dark from-start-gradient to-end-gradient m-0.5 w-42 flex-col items-center border bg-linear-to-br p-2 text-center sm:m-1 sm:text-lg"
            >
                <div className="flex w-full flex-row items-center justify-center">
                    <img
                        src={pokemonInfo.image}
                        alt={pokemonInfo.name.english}
                        className="mx-2 mt-3 h-32 w-32 border-1 bg-amber-100 outline-1"
                    />
                </div>

                <div className="card-body join join-vertical w-full gap-0 px-1.5 py-2 text-shadow-sm">
                    <p className="join-item">#{pokemonInfo.number}</p>
                    <p className="join-item flex flex-row items-center justify-between font-semibold">
                        {pokemonInfo.name.english || "N/A"}{" "}
                        <span>
                            <UKFlag title="English" />
                        </span>
                    </p>
                    <p className="join-item flex flex-row items-center justify-between font-semibold">
                        {pokemonInfo.name.german || "N/A"}{" "}
                        <span>
                            <GermanyFlag title="German" />
                        </span>
                    </p>
                    <p className="join-item flex flex-row items-center justify-between font-semibold">
                        <span>{pokemonInfo.name.japanese || "N/A"}</span>
                        <span>
                            <JapanFlag title="Japanese" />
                        </span>
                    </p>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
