import React, { PropTypes } from 'react';
import { bytesToKb } from '../helpers';

function LibraryTotals({ normal, minified, gzipped }) {
  return (
    <tfoot>
      <tr>
        <td/>
        <td>Total</td>
        <td className="hide-mobile"/>
        <td>{bytesToKb(normal)} <span className="unit">kB</span></td>
        <td>{bytesToKb(minified)} <span className="unit">kB</span></td>
        <td>{bytesToKb(gzipped)} <span className="unit">kB</span></td>
      </tr>
    </tfoot>
  );
}

LibraryTotals.propTypes = {
  gzipped: PropTypes.number.isRequired,
  minified: PropTypes.number.isRequired,
  normal: PropTypes.number.isRequired
};

export default LibraryTotals;
