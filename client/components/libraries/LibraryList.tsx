import React from "react";
import { useSelector } from "react-redux";

import LibraryRow from "./LibraryRow";
import MinificationNote from "../MinificationNote";
import LibraryTotals from "./LibraryTotals";
import SortableColumnHeading from "./SortableColumnHeading";

import "../../styles/libraries/library-list.scss";
import {
  getLibrariesFetching,
  getMarkedSearchedAndSortedLibraries,
} from "../../selectors";

const LibraryList = (): JSX.Element => {
  const libraries = useSelector(getMarkedSearchedAndSortedLibraries);
  const fetching = useSelector(getLibrariesFetching);

  if (fetching) {
    return (
      <div className="library-list__loader">
        <i className="fa fa-lg fa-circle-o-notch fa-spin" />
      </div>
    );
  }

  return (
    <div>
      <table className="library-list">
        <thead>
          <tr>
            <th>
              <span className="hide-mobile">Use</span>
            </th>
            <SortableColumnHeading prop="name" title="Name" />
            <th className="hide-mobile">Version</th>
            <SortableColumnHeading prop="normal" title="Normal" />
            <SortableColumnHeading
              prop="minified"
              title="Minified*"
              titleMobile="Min*"
            />
            <SortableColumnHeading
              prop="gzipped"
              title="Min + gzip*"
              titleMobile="gzip*"
            />
          </tr>
        </thead>
        <tbody>
          {libraries.map((library) => (
            <LibraryRow
              key={library.name + "@" + library.version}
              {...library}
            />
          ))}
        </tbody>
        <LibraryTotals />
      </table>
      <MinificationNote />
    </div>
  );
};

export default LibraryList;
