import { useEffect, useRef } from "react";
import PokemonUI from "../assets/Pkmn_ruby_ui.png";
import PokeballImage from "../assets/Poke_Ball_ZA_Art.png";

import type { PokemonDataResponse } from "../types/types";
import { NameSearchBar } from "./NameSearchBar";

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
  let pokemonName = pokemonData?.translated || "";

  useEffect(() => {
    if (audioRef.current && crySoundObjectURL) {
      audioRef.current.src = crySoundObjectURL;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [crySoundObjectURL]);

  if (pokemonData === null) {
    pokemonName = "Can't find Pokémon";
  }

  return (
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
      <div className="absolute inset-0 top-[150px] flex justify-center">
        {pokemonData?.image && !isLoading && (
          <img
            src={pokemonData.image}
            alt={pokemonData.translated}
            className="h-[256px] w-[256px] object-contain"
          />
        )}
      </div>
      {isLoading && (
        <div className="absolute inset-0 top-[200px] my-4 flex justify-center">
          <div className="h-32 w-32 animate-spin">
            <img src={PokeballImage} alt="Loading Pokemon"></img>
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
  );
};
