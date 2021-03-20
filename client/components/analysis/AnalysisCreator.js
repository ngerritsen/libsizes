import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraryInput } from "../../selectors";
import { inputAnalysisLibrary, analyze } from "../../actions/analysis";

import "../../styles/analysis/analysis-creator.scss";

const AnalysisCreator = () => {
  const dispatch = useDispatch();
  const libraryInput = useSelector(getLibraryInput);
  const canSubmit = Boolean(libraryInput.trim());

  return (
    <form
      className="analysis-creator"
      onSubmit={(event) => {
        event.preventDefault();

        if (canSubmit) {
          dispatch(analyze(libraryInput));
        }
      }}
    >
      <input
        onChange={(event) => dispatch(inputAnalysisLibrary(event.target.value))}
        type="text"
        value={libraryInput}
        className="input analysis-creator__input"
        placeholder="redux@^3.6.0"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck="false"
      />
      <button
        className={"button" + (canSubmit ? "" : " button--is-disabled")}
        type={canSubmit ? "submit" : "button"}
      >
        Analyze
      </button>
    </form>
  );
};

export default AnalysisCreator;
