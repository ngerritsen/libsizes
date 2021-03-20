import React from "react";
import PropTypes from "prop-types";

import "../../styles/libraries/library-search.scss";

function LibrarySearch({ search, searchTerms }) {
  return (
    <input
      type="text"
      className="input library-search"
      placeholder="Search"
      autoCapitalize="off"
      autoComplete="off"
      spellCheck="false"
      value={searchTerms}
      onChange={(event) => search(event.target.value)}
    />
  );
}

LibrarySearch.propTypes = {
  search: PropTypes.func.isRequired,
  searchTerms: PropTypes.string.isRequired,
};

export default LibrarySearch;
