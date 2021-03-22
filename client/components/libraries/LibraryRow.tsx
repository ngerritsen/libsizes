import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { stopUsing, use } from "../../actions";
import { bytesToKb } from "../../helpers";

import "../../styles/libraries/library-row.scss";

type LibraryRowProps = {
  gzipped: number;
  minified: number;
  name: string;
  normal: number;
  used: boolean;
  version: string;
};

const LibraryRow = ({
  name,
  normal,
  minified,
  gzipped,
  used,
  version,
}: LibraryRowProps): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={used ? "true" : undefined}
          onChange={() => dispatch(used ? stopUsing(name) : use(name))}
        />
      </td>
      <td>
        <Link to={"/library/" + name}>
          {name}
          <span className="hide-desktop">@{version}</span>
        </Link>
      </td>
      <td className="version hide-mobile">{version}</td>
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
  );
};

export default LibraryRow;
