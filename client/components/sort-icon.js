import React, { PropTypes } from 'react';

const arrowDown = String.fromCharCode(9660);
const arrowUp = String.fromCharCode(9650);

function SortIcon({ prop, sortBy, sortReversed }) {
  return (
    <span className="sort-icon">
      {(() => {
        if (sortBy === prop) {
          return sortReversed ? arrowDown : arrowUp;
        }
      })()}
    </span>
  );
}

SortIcon.propTypes = {
  prop: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired
};

export default SortIcon;
