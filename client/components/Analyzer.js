import React from "react";

import Analyses from "./analysis/Analyses";
import AnalysisCreator from "./analysis/AnalysisCreator";

const Analyzer = () => {
  return (
    <>
      <AnalysisCreator />
      <Analyses />
    </>
  );
};

export default Analyzer;
