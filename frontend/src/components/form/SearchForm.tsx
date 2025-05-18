"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function SearchForm() {
  const [key, setKey] = useState<string>("");
  const handleSearch = () => {
    window.location.hash = key;
  };

  return (
    <form className="flex gap-1" onSubmit={handleSearch}>
      <input
        type="text"
        onChange={(e) => setKey(e.target.value.split(" ").join("-"))}
        className="border py-1 text-center rounded-xl border-gray-400 w-100 outline-green-500"
        placeholder="search with keyword...."
        name="keyword"
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
