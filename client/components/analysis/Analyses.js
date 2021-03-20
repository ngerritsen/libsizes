import React from "react";
import { useSelector } from "react-redux";

import Analysis from "./Analysis";
import { getAnalyses } from "../../selectors";

import "../../styles/analysis/analyses.scss";

const Analyses = () => {
  const analyses = useSelector(getAnalyses);
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
};

export default Analyses;
