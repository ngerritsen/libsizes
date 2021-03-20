import React from "react";
import PropTypes from "prop-types";

import { bytesToKb } from "../../helpers";
import "../../styles/libraries/library-list-totals.scss";

function LibraryTotals({ normal, minified, gzipped }) {
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
}

LibraryTotals.propTypes = {
  gzipped: PropTypes.number.isRequired,
  minified: PropTypes.number.isRequired,
  normal: PropTypes.number.isRequired,
};

export default LibraryTotals;
