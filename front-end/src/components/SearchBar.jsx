import React, { useState } from "react";
import "../search.css"

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
  <input
    type="text"
    placeholder="Search by title"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" onClick={handleSearch}>
    Search
  </button>
</div>
  );
};

export default SearchBar;
