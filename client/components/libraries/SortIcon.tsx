import React from "react";

import "../../styles/sort-icon.scss";

type SortIconProps = {
  prop: string;
  sortBy: string;
  sortReversed: boolean;
};

const SortIcon = ({
  prop,
  sortBy,
  sortReversed,
}: SortIconProps): JSX.Element | null => {
  if (sortBy === prop) {
    return (
      <i className={`sort-icon fa fa-caret-${sortReversed ? "down" : "up"}`} />
    );
  }

  return null;
};

export default SortIcon;
