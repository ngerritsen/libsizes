import React, { PropTypes } from 'react';
import { bytesToKb } from '../helpers';

import '../styles/library-row.scss';

function LibraryRow({ name, normal, minified, gzipped, stopUsing, use, used, version }) {
  return (
      <tr>
        <td>
          <input
            type="checkbox"
            value={used}
            onChange={() => used ? stopUsing(name) : use(name)}
          />
        </td>
        <td>
          <a target="_blank" href={`http://npmjs.com/package/${name}`}>
            {name}<span className="hide-desktop">@{version}</span>
          </a>
        </td>
        <td className="version hide-mobile">{version}</td>
        <td>{bytesToKb(normal)} <span className="unit">kB</span></td>
        <td>{bytesToKb(minified)} <span className="unit">kB</span></td>
        <td>{bytesToKb(gzipped)} <span className="unit">kB</span></td>
      </tr>
  );
}

LibraryRow.propTypes = {
  gzipped: PropTypes.number.isRequired,
  minified: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  normal: PropTypes.number.isRequired,
  stopUsing: PropTypes.func.isRequired,
  use: PropTypes.func.isRequired,
  used: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired
};

export default LibraryRow;
