import React, { PropTypes } from 'react';
import { Analysis } from '.';

import '../styles/analyses.scss';

function Analyses({ analyses }) {
  return (
    <ul className="analyses">
        {analyses.map(analysis => <Analysis key={analysis.id} {...analysis}/>)}
    </ul>
  );
}

Analyses.propTypes = {
  analyses: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Analyses;
