import React from "react";

import AnalyzerNotice from "./analysis/AnalyzerNotice";
import LibrarySearch from "./libraries/LibrarySearch";
import LibraryList from "./libraries/LibraryList";

const Browser = (): JSX.Element => (
  <>
    <LibrarySearch />
    <LibraryList />
    <AnalyzerNotice subject="library" />
  </>
);

export default Browser;
