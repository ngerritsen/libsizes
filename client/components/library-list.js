import React, { PropTypes } from 'react';

import LibraryRow from './library-row';
import SortableColumnHeading from './sortable-column-heading';
import LibraryTotals from './library-totals';

import '../styles/library-list.scss';

function LibraryList({ libraries, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const sortHeadingProps = { sort, sortBy, sortReversed };
  return (
    <div>
      <table className="library-list">
        <thead>
          <tr>
            <th><span className="hide-mobile">Use</span></th>
            <SortableColumnHeading {...sortHeadingProps} prop="name" title="Name"/>
            <th className="hide-mobile">Version</th>
            <SortableColumnHeading {...sortHeadingProps} prop="normal" title="Normal"/>
            <SortableColumnHeading {...sortHeadingProps} prop="min" title="Minified*" titleMobile="Min*"/>
            <SortableColumnHeading {...sortHeadingProps} prop="mingzip" title="Min + gzip*" titleMobile="gzip*"/>
          </tr>
        </thead>
        <tbody>
          {libraries.map(library =>
            <LibraryRow key={library.name + '@' + library.version} {...library} stopUsing={stopUsing} use={use}/>
          )}
        </tbody>
        <LibraryTotals {...totals}/>
      </table>
      <p className="library-list__note">
        *Sizes may vary according to bundler, minifier and their settings.
        Here, minified sizes are generated using Webpack with the UglifyJS plugin.
      </p>
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
