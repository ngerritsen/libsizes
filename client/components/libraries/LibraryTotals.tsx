import React from "react";

import { bytesToKb } from "../../helpers";
import "../../styles/libraries/library-list-totals.scss";
import { useSelector } from "react-redux";
import { getLibraryTotals } from "../../selectors";

const LibraryTotals = (): JSX.Element => {
  const { normal, minified, gzipped } = useSelector(getLibraryTotals);

  return (
    <tfoot className="library-list-totals">
      <tr>
        <td />
        <td>Total</td>
        <td className="hide-mobile" />
        <td>
          {bytesToKb(normal)} <span className="unit">kB</span>
        </td>
        <td>
          {bytesToKb(minified)} <span className="unit">kB</span>
        </td>
        <td>
          {bytesToKb(gzipped)} <span className="unit">kB</span>
        </td>
      </tr>
    </tfoot>
  );
};

export default LibraryTotals;
