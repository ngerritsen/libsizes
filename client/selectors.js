import { sortByVersion } from "./helpers";

export const getLibraryCount = (state) => state.libraries.libraries.length;
export const getVersions = (state, name) =>
  sortByVersion(
    state.libraries.libraries.filter((library) => library.name === name)
  );

export const getLibrary = (state, name) =>
  sortByVersion(
    state.libraries.libraries.find((library) => library.name === name)
  );
