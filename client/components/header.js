import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/header.scss';

function Header({ libraryCount }) {
  return (
    <div className="header">
      <div className="container-fluid">
        <p className="header__quote">
          {libraryCount} library {libraryCount === 1 ? 'size' : 'sizes'} analyzed
          <span className="seperator" />
        </p>
        <h1 className="header__title">libsizes</h1>
        <nav className="header__navigation">
          <Link to="/" className="header__navigation-item">Browse</Link>
          <Link to="/analyze" className="header__navigation-item">Analyze</Link>
        </nav>
      </div>
    </div>
  );
}

Header.propTypes = {
  libraryCount: PropTypes.number.isRequired
};

export default Header;
