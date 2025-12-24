import React, { useState } from "react";
import { SuggestionsList } from "./SuggestionsList";
import { useSearch } from "../../hooks/useSearch";
import { capitalizeFirstLetter } from "../../utils/string";
import { TranslateButton } from "./TranslateButton";

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
    const maxSuggestions = 8;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        } else if (e.key === "Enter") {
            e.preventDefault();

            if (highlightedIndex >= 0) {
                onTranslateName(
                    capitalizeFirstLetter(suggestions[highlightedIndex]),
                );
            } else {
                onTranslateName(input);
            }
            handleResetSuggestions();
        } else if (e.key === "Escape") {
            e.preventDefault();
            handleResetSuggestions();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        if (value.length > 0) {
            const matches = pokemonNames.filter(
                (name) =>
                    name && name.toLowerCase().startsWith(value.toLowerCase()),
            );
            setSuggestions(matches.slice(0, maxSuggestions)); // Show up to 10 suggestions
        } else {
            setSuggestions([]);
        }
    };

    const handleResetSuggestions = () => {
        setTimeout(() => {
            setSuggestions([]);
            setHighlightedIndex(-1);
        }, 100);
    };

    return (
        <div className="relative flex w-full flex-col items-center">
            <div className="join">
                <label className="input join-item w-full max-w-[32rem] min-w-[12rem] dark:border-gray-300 dark:bg-gray-700 dark:text-white">
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
                        className="input-lg join-item"
                        type="search"
                        placeholder="Enter name"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleResetSuggestions}
                    />
                </label>
                <TranslateButton
                    input={input}
                    onClick={onTranslateName}
                    className="join-item"
                />
            </div>
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
