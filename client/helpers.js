import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import semver from 'semver';

export function sortLibraries(libraries, sortProp, reversed) {
  const sortedLibraries = sortLibrariesRaw(libraries, sortProp);
  return reversed ? sortedLibraries.reverse() : sortedLibraries;
}

function sortLibrariesRaw(libraries, sortProp) {
  if (libraries.length === 0) {
    return libraries;
  }

  const valueType = typeof libraries[0][sortProp]; // Infer value type with first value in array

  if (valueType === 'string') {
    return sortBy(libraries, library => library[sortProp].toLowerCase());
  }

  return sortBy(libraries, library => library[sortProp]);
}

export function searchLibraries(libraries, searchValue) {
  return libraries.filter(library => library.name.toLowerCase().indexOf(searchValue) > -1 || library.used);
}

export function markUsedLibraries(libraries, usedLibraries) {
  return libraries.map(library => ({
    ...library,
    used: usedLibraries.includes(library.name)
  }));
}

export function collapseLibraries(libraries) {
  return groupedLibrariesToArray(groupBy(libraries, library => library.name))
    .map(libraryVersions => collapseLibrary(libraryVersions));
}

function collapseLibrary(libraryVersions) {
  const sortedLibraryVersions = sortByVersion(libraryVersions);
  return {
    ...sortedLibraryVersions[0],
    versions: sortedLibraryVersions
  };
}

function sortByVersion(libraryVersions) {
  return libraryVersions
    .slice()
    .sort((a, b) => semver.lt(a.version, b.version));
}

function groupedLibrariesToArray(groupedLibraries) {
  return Object.keys(groupedLibraries)
    .map(key => groupedLibraries[key]);
}

export function calculateTotals(libraries) {
  return libraries
    .filter(library => library.used)
    .reduce((prev, curr) => {
      return {
        normal: prev.normal + curr.normal,
        minified: prev.minified + curr.minified,
        gzipped: prev.gzipped + curr.gzipped
      };
    }, { normal: 0, minified: 0, gzipped: 0 });
}

export function resultToMessage(result) {
  if (!result || typeof result !== 'object') {
    return null;
  }

  const { normal, minified, gzipped } = result;

  return `Size: ${bytesToKb(normal)}kB, minified: ${bytesToKb(minified)}kB, gzipped ${bytesToKb(gzipped)}kB.`;
}

export function bytesToKb(bytes) {
  if (bytes < 10240) {
    return Math.round(bytes / 102.4) / 10;
  }

  return Math.round(bytes / 1024, 1);
}
