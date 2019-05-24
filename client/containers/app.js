import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Header, Footer } from '../components';

function App({ children, libraryCount }) {
  return (
    <div>
      <Header libraryCount={libraryCount} />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  libraryCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

function mapStateToProps({ libraries }) {
  return {
    libraryCount: libraries.libraries.length
  };
}

export default connect(mapStateToProps)(App);
