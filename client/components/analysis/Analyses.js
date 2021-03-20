import React from "react";
import PropTypes from "prop-types";

import Analysis from "./Analysis";

import "../../styles/analysis/analyses.scss";

const Analyses = ({ analyses }) => {
  return (
    <ul className="analyses">
      {analyses
        .slice()
        .reverse()
        .map((analysis) => (
          <Analysis key={analysis.id} {...analysis} />
        ))}
    </ul>
  );
}

Analyses.propTypes = {
  analyses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Analyses;
