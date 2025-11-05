import Modal from "react-modal";

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
      className="fixed top-20 right-10 bottom-20 left-10 bg-amber-300"
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
      <h2>Test</h2>
      <button className="btn" onClick={onRequestClose}></button>
    </Modal>
  );
};
