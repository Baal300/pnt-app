type TranslateButtonProps = {
    input: string;
    onClick: (name: string) => void;
};

export const TranslateButton = ({ input, onClick }: TranslateButtonProps) => {
    return (
        <button
            className="btn btn-primary mb-4 max-w-[32rem] min-w-[16rem] text-2xl"
            onClick={() => onClick(input)}
        >
            Translate
        </button>
    );
};
