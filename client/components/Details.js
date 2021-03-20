import React from "react";

import LibraryInfo from "./libraries/LibraryInfo";
import LibraryVersions from "./libraries/LibraryVersions";
import AnalyzerNotice from "./analysis/AnalyzerNotice";

const Details = () => (
  <>
    <LibraryInfo />
    <LibraryVersions />
    <AnalyzerNotice subject="version" />
  </>
);

export default Details;
