import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SearchForm() {
  return (
    <form className="flex gap-1">
      <input
        type="text"
        className="border py-1 text-center rounded-xl border-gray-400 w-100 outline-green-500"
        placeholder="search with keyword...."
      />
      <button
        type="submit"
        className="text-center bg-green-500 py-1 px-4 rounded-xl text-white"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
