import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import SortIcon from "./SortIcon";
import { sort } from "../../actions/libraries";
import { getSortBy, getSortReversed } from "../../selectors";

import "../../styles/libraries/sortable-column-heading.scss";

const SortableColumnHeading = ({
  prop,
  title,
  titleMobile,
}) => {
  const dispatch = useDispatch();
  const sortBy = useSelector(getSortBy);
  const sortReversed = useSelector(getSortReversed);

  return (
    <th className="sortable-column-heading" onClick={() => dispatch(sort(prop))}>
      <span className="hide-mobile">{title}</span>
      <span className="hide-desktop">{titleMobile || title}</span>
      <SortIcon prop={prop} sortBy={sortBy} sortReversed={sortReversed} />
    </th>
  );
}

SortableColumnHeading.propTypes = {
  prop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleMobile: PropTypes.string,
};

export default SortableColumnHeading;
