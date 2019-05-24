import React from 'react';

import '../styles/minification-note.scss';

function MinificationNote() {
  return (
    <p className="minification-note">
      *Sizes may vary according to bundler, minifier and their settings. Here, minified sizes are
      generated using Webpack with the UglifyJS plugin.
    </p>
  );
}

export default MinificationNote;
