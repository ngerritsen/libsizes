import React from "react";

import "../styles/minification-note.scss";

const MinificationNote = (): JSX.Element => (
  <p className="minification-note">
    *Sizes may vary according to bundler, minifier and their settings. Here,
    minified sizes are generated using Webpack in production mode.
  </p>
);

export default MinificationNote;
