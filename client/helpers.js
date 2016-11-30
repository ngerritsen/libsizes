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
        min: prev.min + curr.min,
        mingzip: prev.mingzip + curr.mingzip
      };
    }, { normal: 0, min: 0, mingzip: 0 });
}

function sortBy(array, getValue) {
  return array.slice().sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue > bValue) {
      return 1;
    }

    if (aValue < bValue) {
      return -1;
    }

    return 0;
  });
}
