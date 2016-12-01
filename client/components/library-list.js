import React, { PropTypes } from 'react';

import LibraryRow from './library-row';
import SortableColumnHeading from './sortable-column-heading';
import LibraryTotals from './library-totals';

import '../styles/library-list.scss';

function LibraryList({ libraries, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const sortHeadingProps = { sort, sortBy, sortReversed };
  return (
    <div>
      <input
        type="text"
        className="library-list__search"
        placeholder="Search"
        value={searchTerms}
        onChange={event => search(event.target.value)}
      />
      <table className="library-list">
        <thead>
          <tr>
            <th><span className="hide-mobile">Use</span></th>
            <SortableColumnHeading {...sortHeadingProps} prop="name" title="Name"/>
            <th className="hide-mobile">Version</th>
            <SortableColumnHeading {...sortHeadingProps} prop="normal" title="Size"/>
            <SortableColumnHeading {...sortHeadingProps} prop="min" title="Minified*"/>
            <SortableColumnHeading {...sortHeadingProps} prop="mingzip" title="Min + Gzip*"/>
          </tr>
        </thead>
        <tbody>
          {libraries.map(library =>
            <LibraryRow key={library.name + '@' + library.version} {...library} stopUsing={stopUsing} use={use}/>
          )}
        </tbody>
        <LibraryTotals {...totals}/>
      </table>
    </div>
  );
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.func.isRequired,
  searchTerms: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired,
  stopUsing: PropTypes.func.isRequired,
  totals: PropTypes.object.isRequired,
  use: PropTypes.func.isRequired
};

export default LibraryList;
