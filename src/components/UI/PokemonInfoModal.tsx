import Modal from "react-modal";
import { DataCard } from "./DataCard";

type PokemonInfoModal = {
    isOpen: boolean;
    onRequestClose: () => void;
};

export const PokemonInfoModal = ({
    isOpen,
    onRequestClose,
}: PokemonInfoModal) => {
    return (
        <Modal
            isOpen={isOpen}
            className="fixed top-20 right-10 bottom-20 left-10 m-auto max-w-4xl"
            contentLabel="Pokémon details"
            // overlayClassName="fixed z-1 bg-transparent top-0 right-0 bottom-0 left-0"
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
                <DataCard title={"Pokédex number"} />
                <DataCard title={"Names"} />
                <DataCard title={"Types"} />
            </div>
        </Modal>
    );
};
