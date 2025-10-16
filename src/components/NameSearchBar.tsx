import React, { useState } from "react";
import { SuggestionsList } from "./SuggestionsList";
import { useSearch } from "../hooks/useSearch";
import { capitalizeFirstLetter } from "../utils/string";

type NameSearchBarProps = {
  input: string;
  setInput: (input: string) => void;
  onTranslateName: (name: string) => void;
};

export const NameSearchBar = ({
  input,
  setInput,
  onTranslateName,
}: NameSearchBarProps) => {
  const { suggestions, setSuggestions, pokemonNames } = useSearch();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (highlightedIndex >= 0 && e.key === "Enter") {
      e.preventDefault();

      onTranslateName(capitalizeFirstLetter(suggestions[highlightedIndex]));
      handleBlur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      onTranslateName(input);
      handleBlur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleBlur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const matches = pokemonNames.filter(
        (name) => name && name.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(matches.slice(0, 10)); // Show up to 10 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }, 100);
  };

  return (
    <div>
      <label className="input mt-2 mb-2 w-full max-w-[32rem] min-w-[20rem] dark:border-gray-300 dark:bg-gray-700 dark:text-white">
        <svg
          className="h-[1em] opacity-50"
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
        <input
          className="input-lg"
          type="search"
          placeholder="Enter name"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          onBlur={handleBlur}
        />
      </label>
      <SuggestionsList
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        onKeyDown={handleKeyDown}
        onSuggestionSelected={onTranslateName}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
      />
    </div>
  );
};
