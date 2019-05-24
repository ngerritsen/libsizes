import React, { PropTypes } from 'react';

import { LibraryRow, MinificationNote, LibraryTotals, SortableColumnHeading } from '..';

import '../../styles/libraries/library-list.scss';

function LibraryList({ libraries, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const sortHeadingProps = { sort, sortBy, sortReversed };
  return (
    <div>
      <table className="library-list">
        <thead>
          <tr>
            <th>
              <span className="hide-mobile">Use</span>
            </th>
            <SortableColumnHeading {...sortHeadingProps} prop="name" title="Name" />
            <th className="hide-mobile">Version</th>
            <SortableColumnHeading {...sortHeadingProps} prop="normal" title="Normal" />
            <SortableColumnHeading
              {...sortHeadingProps}
              prop="minified"
              title="Minified*"
              titleMobile="Min*"
            />
            <SortableColumnHeading
              {...sortHeadingProps}
              prop="gzipped"
              title="Min + gzip*"
              titleMobile="gzip*"
            />
          </tr>
        </thead>
        <tbody>
          {libraries.map(library => (
            <LibraryRow
              key={library.name + '@' + library.version}
              {...library}
              stopUsing={stopUsing}
              use={use}
            />
          ))}
        </tbody>
        <LibraryTotals {...totals} />
      </table>
      <MinificationNote />
    </div>
  );
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired,
  stopUsing: PropTypes.func.isRequired,
  totals: PropTypes.object.isRequired,
  use: PropTypes.func.isRequired
};

export default LibraryList;
