import React, { PropTypes } from 'react';

import '../styles/library-row.scss';

function LibraryRow({ name, normal, min, mingzip, stopUsing, use, used, version }) {
  return (
      <tr>
        <td>
          <input
            type="checkbox"
            value={used}
            onChange={() => used ? stopUsing(name) : use(name)}
          />
        </td>
        <td><a target="_blank" href={`http://npmjs.com/package/${name}`}>{name}</a></td>
        <td className="version hide-mobile">{version}</td>
        <td>{normal} <span className="unit">kB</span></td>
        <td>{min} <span className="unit">kB</span></td>
        <td>{mingzip} <span className="unit">kB</span></td>
      </tr>
  );
}

LibraryRow.propTypes = {
  min: PropTypes.number.isRequired,
  mingzip: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  normal: PropTypes.number.isRequired,
  stopUsing: PropTypes.func.isRequired,
  use: PropTypes.func.isRequired,
  used: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired
};

export default LibraryRow;
