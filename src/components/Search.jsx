import React from "react";

const Search = ({ search, handleChange, handleSearch, isButtonDisabled }) => {
  return (
    <section className="px-10 lg:px-20 xl:px-40 pt-15 pb-5">
      <div className="flex items-center justify-center gap-1">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Type place name..."
          className="w-full sm:max-w-2/3 lg:max-w-1/2 h-15 text-center text-xl placeholder:text-gray-500 placeholder:italic placeholder:text-center border-1 border-slate-500 p-2 rounded-lg bg-slate-100"
          value={search}
          onChange={handleChange}
        />
        <button
          className={`py-1 px-4 h-15 text-xl border-1 border-slate-500 rounded-lg bg-slate-100 text-sky-500 ${
            isButtonDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          onClick={handleSearch}
          disabled={isButtonDisabled}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
