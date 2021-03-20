import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { stopUsing, use } from "../../actions/libraries";
import { bytesToKb } from "../../helpers";

import "../../styles/libraries/library-row.scss";

const LibraryRow = ({
  name,
  normal,
  minified,
  gzipped,
  used,
  version,
}) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={used}
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
}

LibraryRow.propTypes = {
  gzipped: PropTypes.number.isRequired,
  minified: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  normal: PropTypes.number.isRequired,
  used: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired,
};

export default LibraryRow;
