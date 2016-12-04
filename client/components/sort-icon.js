import React, { PropTypes } from 'react';

import '../styles/sort-icon.scss';

function SortIcon({ prop, sortBy, sortReversed }) {
  if (sortBy === prop) {
    return <i className={'sort-icon fa fa-caret-' + (sortReversed ? 'down' : 'up')}/>;
  }

  return null;
}

SortIcon.propTypes = {
  prop: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired
};

export default SortIcon;
