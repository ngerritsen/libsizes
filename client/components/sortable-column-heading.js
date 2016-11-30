import React, { PropTypes } from 'react';
import SortIcon from './sort-icon';

function SortableColumnHeading({ prop, sort, sortBy, sortReversed, title }) {
  return (
    <th className="sortable" onClick={() => sort(prop)}>
      {title} <SortIcon prop={prop} sortBy={sortBy} sortReversed={sortReversed}/>
    </th>
  );
}

SortableColumnHeading.propTypes = {
  prop: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default SortableColumnHeading;
