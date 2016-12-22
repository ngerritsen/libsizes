import React, { PropTypes } from 'react';
import { SortIcon } from '.';

import '../styles/sortable-column-heading.scss';

function SortableColumnHeading({ prop, sort, sortBy, sortReversed, title, titleMobile }) {
  return (
    <th className="sortable-column-heading" onClick={() => sort(prop)}>
      <span className="hide-mobile">{title}</span>
      <span className="hide-desktop">{titleMobile || title}</span>
      <SortIcon prop={prop} sortBy={sortBy} sortReversed={sortReversed}/>
    </th>
  );
}

SortableColumnHeading.propTypes = {
  prop: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  titleMobile: PropTypes.string
};

export default SortableColumnHeading;
