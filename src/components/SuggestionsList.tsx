type SuggestionsListProps = {
  suggestions: string[];
  nameEnteredHandler: (name: string) => void;
  highlightedIndex?: number;
};

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const SuggestionsList = ({
  suggestions,
  nameEnteredHandler,
  highlightedIndex = -1,
}: SuggestionsListProps) => {
  return (
    suggestions.length > 0 && (
      <div className="mb-2 w-full max-w-xs rounded border bg-white shadow">
        <ul className="m-0 list-none p-0">
          {suggestions.map((name, index) => (
            <li
              key={name}
              className={`cursor-pointer px-2 py-1 ${
                index === highlightedIndex ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => nameEnteredHandler(capitalize(name))}
            >
              {capitalize(name)}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
