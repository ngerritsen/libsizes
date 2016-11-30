import React, { PropTypes } from 'react';

import '../styles/header.scss';

function Header({ libraryCount }) {
  return (
    <div className="header">
      <div className="container-fluid">
        <h1 className="header__title">libsizes</h1>
        <p className="header__quote">
          {libraryCount} library sizes generated
          <span className="seperator" />
          <a
            className="header__github-link"
            href="https://github.com/ngerritsen/libsizes"
            target="_blank"
            title="Check out the Github repository"
          >
            <span className="octicon octicon-mark-github"/> View on Github
          </a>
        </p>

      </div>
    </div>
  );
}

Header.propTypes = {
  libraryCount: PropTypes.number.isRequired
};

export default Header;
