import sortBy from 'lodash/sortBy';

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
  return libraries.filter(library => library.name.toLowerCase().indexOf(searchValue) > -1);
}

export function markUsedLibraries(libraries, usedLibraries) {
  return libraries.map(library => ({
    ...library,
    used: usedLibraries.includes(library.name)
  }));
}

export function calculateTotals(libraries) {
  return libraries
    .filter(library => library.used)
    .reduce((prev, curr) => {
      return {
        normal: prev.normal + curr.normal,
        minified: prev.minified + curr.minfied,
        gzipped: prev.gzipped + curr.gzipped
      };
    }, { normal: 0, minified: 0, gzipped: 0 });
}

export function resultToMessage(result) {
  if (!result || typeof result !== 'object') {
    return null;
  }

  const { normal, minified, gzipped } = result;

  return `Size: ${bytesToKb(normal)}kB, minfied: ${bytesToKb(minified)}kB, gzipped ${bytesToKb(gzipped)}kB.`;
}

export function bytesToKb(bytes) {
  if (bytes < 10240) {
    return Math.round(bytes / 102.4) / 10;
  }

  return Math.round(bytes / 1024, 1);
}
