import React, { PropTypes } from 'react';

import { bytesToKb } from '../../helpers';
import { MinificationNote } from '..';

import '../../styles/libraries/library-list.scss';

function LibraryVersions({ versions }) {
  return (
    <div>
      <table className="library-list">
        <thead>
          <tr>
            <th>Version</th>
            <th>Normal</th>
            <th>Minified*</th>
            <th>Min + Gzip*</th>
          </tr>
        </thead>
        <tbody>
          {versions.map(({ version, normal, minified, gzipped }) => (
            <tr key={version}>
              <td>{version}</td>
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
          ))}
        </tbody>
      </table>
      <MinificationNote />
    </div>
  );
}

LibraryVersions.propTypes = {
  versions: PropTypes.array.isRequired
};

export default LibraryVersions;
