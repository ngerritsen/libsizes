import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../styles/libraries/library-info.scss";
import { getLibrary } from "../../selectors";

const LibraryInfo = () => {
  const params = useParams();
  const name = params.library;
  const libary = useSelector(getLibrary, name);

  return (
    <div className="library-info">
      <h1
        className={
          "library-info__title" +
          (libary ? "" : " library-info__title--not-found")
        }
      >
        {libary ? name : `Library '${name}' not found.`}
      </h1>
      {libary && (
        <a href={"http://npmjs.com/" + name} className="library-info__npm-link">
          View {name} on npm.
        </a>
      )}
    </div>
  );
};

export default LibraryInfo;
