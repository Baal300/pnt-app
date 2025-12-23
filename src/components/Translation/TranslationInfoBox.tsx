import { useEffect, useRef, useState } from "react";
import PokemonUI from "../../assets/Pkmn_ruby_ui.png";
import PokeballImage from "../../assets/Poke_Ball_ZA_Art.png";
import type { PokemonDataResponse } from "../../types/types";
import { NameSearchBar } from "./NameSearchBar";
import VolumeIcon from "../../assets/volume_up_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import MutedIcon from "../../assets/no_sound_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import { PokemonInfoModal } from "../UI/PokemonInfoModal";

type TranslationInfoBoxProps = {
    pokemonData?: PokemonDataResponse | null;
    isLoading?: boolean;
    input: string;
    setInput: (input: string) => void;
    onTranslateName: (name: string) => void;
    crySoundObjectURL?: string;
};

export const TranslationInfoBox = ({
    pokemonData,
    isLoading,
    input,
    setInput,
    onTranslateName,
    crySoundObjectURL,
}: TranslationInfoBoxProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [muted, setMuted] = useState(false);
    const cryVolume = 0.2;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    let pokemonName = pokemonData?.translated || "";

    useEffect(() => {
        if (audioRef.current && crySoundObjectURL) {
            if (muted) {
                audioRef.current.muted = true;
                return;
            }
            audioRef.current.muted = false;
            audioRef.current.src = crySoundObjectURL;
            audioRef.current.volume = cryVolume;
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        }
    }, [crySoundObjectURL, cryVolume, muted]);

    const handleMute = () => {
        if (audioRef.current) {
            if (muted) {
                setMuted(false);
            } else {
                setMuted(true);
            }
        }
    };

    if (pokemonData === null) {
        pokemonName = "Can't find Pokémon";
    }

    const handleOpenModal = () => {
        if (pokemonData) {
            setModalIsOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div
                className="relative z-1 flex h-[620px] w-[330px] p-1 drop-shadow-lg"
                style={{
                    backgroundImage: `url(${PokemonUI})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <audio ref={audioRef}></audio>
                <button
                    className="absolute top-[100px] left-[30px] cursor-pointer"
                    onClick={handleMute}
                >
                    {muted ? (
                        <MutedIcon height={"32px"} width={"32px"} />
                    ) : (
                        <VolumeIcon height={"32px"} width={"32px"} />
                    )}
                </button>

                <div
                    onClick={handleOpenModal}
                    tabIndex={0}
                    role="button"
                    className={
                        pokemonData && !isLoading
                            ? `absolute inset-0 top-[150px] mx-auto flex h-[256px] w-[256px] cursor-pointer justify-center`
                            : `absolute inset-0 top-[150px] mx-auto flex h-[256px] w-[256px] justify-center`
                    }
                >
                    {pokemonData?.image && !isLoading && (
                        <div className="hover-3d">
                            <figure className="h-[256px] w-[256px]">
                                <img
                                    src={pokemonData.image}
                                    alt={pokemonData.translated}
                                    className="h-[256px] w-[256px] object-contain"
                                />
                            </figure>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                </div>
                {isLoading && (
                    <div className="absolute inset-0 top-[200px] my-4 flex justify-center">
                        <div className="h-32 w-32 animate-spin">
                            <img
                                src={PokeballImage}
                                alt="Loading Pokemon"
                            ></img>
                        </div>
                    </div>
                )}
                <p className="dark:text-base-content absolute top-[450px] left-0 w-full text-center font-mono text-2xl font-bold">
                    {isLoading ? (
                        <span className="loading loading-dots loading-xl"></span>
                    ) : (
                        pokemonName
                    )}
                </p>
                <div className="absolute bottom-10 flex w-full justify-center px-4">
                    <NameSearchBar
                        input={input}
                        setInput={setInput}
                        onTranslateName={onTranslateName}
                    />
                </div>
            </div>

            <PokemonInfoModal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
            />
        </>
    );
};
