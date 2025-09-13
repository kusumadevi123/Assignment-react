import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search widgets..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
