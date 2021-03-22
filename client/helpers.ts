import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import semver from "semver";
import { Library } from "./types";
import { Sizes } from "../shared/types";

export function sortLibraries(
  libraries: Library[],
  sortProp: string,
  reversed: boolean
): Library[] {
  const sortedLibraries = sortLibrariesRaw(libraries, sortProp);
  return reversed ? sortedLibraries.reverse() : sortedLibraries;
}

function sortLibrariesRaw(libraries: Library[], sortProp: string): Library[] {
  if (libraries.length === 0) {
    return libraries;
  }

  const valueType = typeof libraries[0][sortProp]; // Infer value type with first value in array

  if (valueType === "string") {
    return sortBy(libraries, (library: Library) =>
      library[sortProp].toLowerCase()
    );
  }

  return sortBy(libraries, (library: Library) => library[sortProp]);
}

export function searchLibraries(
  libraries: Library[],
  searchValue: string
): Library[] {
  return libraries.filter(
    (library) =>
      library.name.toLowerCase().indexOf(searchValue) > -1 || library.used
  );
}

export function markUsedLibraries(
  libraries: Library[],
  usedLibraries: string[]
): Library[] {
  return libraries.map((library) => ({
    ...library,
    used: usedLibraries.includes(library.name),
  }));
}

export function collapseLibraries(libraries: Library[]): Library[] {
  return groupedLibrariesToArray(
    groupBy(libraries, (library) => library.name)
  ).map((libraryVersions) => collapseLibrary(libraryVersions));
}

export function sortByVersion(libraryVersions: Library[] = []): Library[] {
  return libraryVersions
    .slice()
    .sort((a, b) => semver.lt(a.version, b.version));
}

function collapseLibrary(libraryVersions: Library[]): Library {
  const sortedLibraryVersions = sortByVersion(libraryVersions);
  return {
    ...sortedLibraryVersions[0],
    versions: sortedLibraryVersions,
  };
}

function groupedLibrariesToArray(
  groupedLibraries: Record<string, Library[]>
): Library[][] {
  return Object.keys(groupedLibraries).map((key) => groupedLibraries[key]);
}

export function calculateTotals(libraries: Library[]): Sizes {
  return libraries
    .filter((library) => library.used)
    .reduce(
      (prev, curr) => {
        return {
          normal: prev.normal + curr.normal,
          minified: prev.minified + curr.minified,
          gzipped: prev.gzipped + curr.gzipped,
        };
      },
      { normal: 0, minified: 0, gzipped: 0 }
    );
}

export function resultToMessage(result: Sizes): string | null {
  if (!result || typeof result !== "object") {
    return null;
  }

  const { normal, minified, gzipped } = result;

  return `Size: ${bytesToKb(normal)}kB, minified: ${bytesToKb(
    minified
  )}kB, gzipped ${bytesToKb(gzipped)}kB.`;
}

export function bytesToKb(bytes: number): number {
  if (bytes < 10240) {
    return Math.round(bytes / 102.4) / 10;
  }

  return Math.round(bytes / 1024);
}
