import React from "react";

type NameSearchBarProps = {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameEntered: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const NameSearchBar = ({
  input,
  onInputChange: handleInputChange,
  onNameEntered: handleNameEntered,
  onKeyDown: handleKeyDown,
}: NameSearchBarProps) => {
  return (
    <>
      <label className="input mt-2 mb-2 w-full max-w-[32rem] min-w-[20rem]">
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
        />
      </label>
      <button
        className="btn mb-2 rounded border bg-blue-500 p-2 text-white hover:bg-blue-400 active:bg-blue-300"
        onClick={() => handleNameEntered(input)}
      >
        Translate
      </button>
    </>
  );
};
