import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SortIcon from "./SortIcon";
import { sort } from "../../actions";
import { getSortBy, getSortReversed } from "../../selectors";

import "../../styles/libraries/sortable-column-heading.scss";

type SortableColumnHeadingProps = {
  prop: string;
  title: string;
  titleMobile?: string;
};

const SortableColumnHeading = ({
  prop,
  title,
  titleMobile,
}: SortableColumnHeadingProps): JSX.Element => {
  const dispatch = useDispatch();
  const sortBy = useSelector(getSortBy);
  const sortReversed = useSelector(getSortReversed);

  return (
    <th
      className="sortable-column-heading"
      onClick={() => dispatch(sort(prop))}
    >
      <span className="hide-mobile">{title}</span>
      <span className="hide-desktop">{titleMobile || title}</span>
      <SortIcon prop={prop} sortBy={sortBy} sortReversed={sortReversed} />
    </th>
  );
};

export default SortableColumnHeading;
