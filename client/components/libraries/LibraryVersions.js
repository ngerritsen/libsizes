import React from "react";

import { bytesToKb } from "../../helpers";
import MinificationNote from "../MinificationNote";

import { useSelector } from "react-redux";
import { getVersions } from "../../selectors";
import { useParams } from "react-router-dom";

import "../../styles/libraries/library-list.scss";

const LibraryVersions = () => {
  const params = useParams();
  const versions = useSelector((state) => getVersions(state, params.library));

  return (
    <>
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
    </>
  );
};

export default LibraryVersions;
