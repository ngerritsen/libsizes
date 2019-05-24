import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { LibraryInfo, LibraryVersions, AnalyzerNotice } from '../components';
import { sortByVersion } from '../helpers';

function Details({ versions, params }) {
  const found = versions && versions[0];
  return (
    <div>
      <LibraryInfo found={!!found} library={params.library} />
      {found && <LibraryVersions versions={versions} />}
      <AnalyzerNotice subject="version" />
    </div>
  );
}

Details.propTypes = {
  params: PropTypes.object,
  versions: PropTypes.array
};

function mapStateToProps({ libraries }, ownProps) {
  return {
    versions: sortByVersion(
      libraries.libraries.filter(library => library.name === ownProps.params.library)
    )
  };
}

export default connect(mapStateToProps)(Details);
