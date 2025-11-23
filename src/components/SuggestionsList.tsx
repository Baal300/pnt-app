import { capitalizeFirstLetter } from "../utils/string";

type SuggestionsListProps = {
    suggestions: string[];
    setSuggestions: (suggestions: string[]) => void;
    onSuggestionSelected: (name: string) => void;
    highlightedIndex: number;
    setHighlightedIndex: (index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const SuggestionsList = ({
    suggestions,
    setSuggestions,
    onSuggestionSelected,
    highlightedIndex,
}: SuggestionsListProps) => {
    const handleSuggestionSelected = (name: string) => {
        onSuggestionSelected(capitalizeFirstLetter(name));
        setSuggestions([]);
    };

    return (
        suggestions.length > 0 && (
            <div className="absolute top-full z-1 mb-2 w-full max-w-xs rounded border bg-white shadow dark:border-gray-300 dark:bg-gray-700 dark:text-white">
                <ul className="m-0 list-none p-0">
                    {suggestions.map((name, index) => (
                        <li
                            key={name}
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 ${
                                index === highlightedIndex
                                    ? "bg-gray-300"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                            onClick={handleSuggestionSelected.bind(null, name)}
                        >
                            <svg
                                className="h-[1em] w-[1em] flex-shrink-0 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <span>{capitalizeFirstLetter(name)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};
