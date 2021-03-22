import React from "react";

import Header from "./Header";
import Footer from "./Footer";

type AppProps = {
  children: JSX.Element;
};

const App = ({ children }: AppProps): JSX.Element => (
  <>
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </>
);

export default App;
