import React from 'react';

const SearchBox = () => {
  return (
    <div className="flex items-center w-full max-w-lg hover:ring-2 hover:ring-indigo-500 transition delay-75 duration-200 bg-[var(--input-box-bg)] rounded-xl shadow-md p-1.5">
      {/* Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-[var(--tertiary-fg)] ml-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for components, styles, creators..."
        className="flex-grow py-4 bg-transparent outline-none text-md text-gray-800 placeholder-[var(--tertiary-fg)] px-4"
      />

      {/* Search Button */}
      <button
        className="bg-[var(--small-button-bg)]  hover:bg-[var(--hover-small-button-bg)] text-white font-semibold text-sm px-8 py-4 rounded-xl"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
