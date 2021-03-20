import React from "react";
import PropTypes from "prop-types";
import "../../styles/analysis/analysis-creator.scss";

const AnalysisCreator = ({ analyze, inputAnalysisLibrary, libraryInput }) => {
  const canSubmit = !!libraryInput.trim();
  return (
    <form
      className="analysis-creator"
      onSubmit={(event) => {
        event.preventDefault();

        if (canSubmit) {
          analyze(libraryInput);
        }
      }}
    >
      <input
        onChange={(event) => inputAnalysisLibrary(event.target.value)}
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
}

AnalysisCreator.propTypes = {
  analyze: PropTypes.func.isRequired,
  inputAnalysisLibrary: PropTypes.func.isRequired,
  libraryInput: PropTypes.string.isRequired,
};

export default AnalysisCreator;
