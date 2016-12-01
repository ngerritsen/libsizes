import React from 'react';

import '../styles/analyzer.scss';

function Analyzer() {
  return (
    <div className="analyzer">
      <div className="container-fluid">
        <div className="analyzer__content">
          <h2 className="analyzer__title">Analyze</h2>
          <input type="text" className="analyzer__input"/>
        </div>
      </div>
    </div>
  );
}

export default Analyzer;
