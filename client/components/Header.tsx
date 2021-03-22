import React from "react";
import { Link } from "react-router-dom";

import "../styles/header.scss";
import { useSelector } from "react-redux";
import { getLibraryCount } from "../selectors";

const Header = (): JSX.Element => {
  const libraryCount = useSelector(getLibraryCount);

  return (
    <div className="header">
      <div className="container">
        <p className="header__quote hide-mobile">
          {libraryCount} library {libraryCount === 1 ? "size" : "sizes"}{" "}
          analyzed.
        </p>
        <h1 className="header__title">
          <svg className="header__logo">
            <use xlinkHref="#polygon" />
          </svg>{" "}
          libsizes
        </h1>
        <nav className="header__navigation">
          <Link to="/" className="header__navigation-item">
            Browse
          </Link>
          <Link to="/analyze" className="header__navigation-item">
            Analyze
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
