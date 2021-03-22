import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../actions";
import { getSearchTerms } from "../../selectors";

import "../../styles/libraries/library-search.scss";

const LibrarySearch = (): JSX.Element => {
  const dispatch = useDispatch();
  const searchTerms = useSelector(getSearchTerms);

  return (
    <input
      type="text"
      className="input library-search"
      placeholder="Search"
      autoCapitalize="off"
      autoComplete="off"
      spellCheck="false"
      value={searchTerms}
      onChange={(event) => dispatch(search(event.target.value))}
    />
  );
};

export default LibrarySearch;
