var libraryDeps = require('./library-deps');

module.exports = function filterDepsFromResults (results) {
  return results.map(function (lib) {
    var deps = getDeps(lib);

    if (deps.length > 0) {
      return computeNewSizes(lib, deps, results);
    }

    return lib;
  });
}

function getDeps (lib) {
  var deps = [];

  libraryDeps.forEach(function (libDep) {
    if (libDep.name === lib.name) {
      deps = libDep.deps;
    }
  });

  return deps;
}

function getLib (libraries, name) {
  var library = null;

  libraries.forEach(function (lib) {
    if (lib.name === name) {
      library = lib;
    }
  });

  return library;
}

function computeNewSizes (lib, deps, libs) {
  deps.forEach(function (dep) {
    var dependency = getLib(libs, dep);
      if (dependency) {
        lib.normal -= dependency.normal;
        lib.min -= dependency.min;
        lib.mingzip -= dependency.mingzip;
      }
  });

  return lib;
}
