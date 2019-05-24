import React, { PropTypes } from 'react';

import '../../styles/libraries/library-info.scss';

function LibraryInfo({ library, found }) {
  return (
    <div className="library-info">
      <h1 className={'library-info__title' + (found ? '' : ' library-info__title--not-found')}>
        {found ? library : `Library '${library}' not found.`}
      </h1>
      {found && (
        <a href={'http://npmjs.com/' + library} className="library-info__npm-link">
          View {library} on npm.
        </a>
      )}
    </div>
  );
}

LibraryInfo.propTypes = {
  found: PropTypes.bool.isRequired,
  library: PropTypes.string.isRequired
};

export default LibraryInfo;
