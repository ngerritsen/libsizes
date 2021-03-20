import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";

const App = ({ children }) => (
  <>
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
