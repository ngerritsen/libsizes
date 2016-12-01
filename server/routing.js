const express = require('express');
const path = require('path');
const shortId = require('shortid');

const analyzeLibrary = require('./analyzer');
const { getInfo } = require('./npm-tools');
const { analysisStarted, analysisSucceeded, analysisFailed } = require('./actions');

const rootPath = path.join(__dirname, '..');

function routing(app, libraryRepository, store) {
  app.use('/public', express.static(path.join(rootPath, 'public')));

  app.get('/api/libraries', (req, res) => {
    libraryRepository.getAll()
      .then(result => res.json(result));
  });

  app.get('/api/analyses/:ids', (req, res) => {
    const ids = req.params.ids.split(',');
    const analyses = store.getState().analyses.filter(({ id }) => ids.includes(id));
    res.json(analyses);
  });

  app.post('/api/analyses/:library', (req, res) => {
    const analysisId = shortId.generate();

    getInfo(req.params.library)
      .then(library => {
        analyze(library, analysisId, libraryRepository, store);
        console.log({ success: true, analysisId });
        res.json({ success: true, analysisId });
      })
      .catch(() => res.json({ success: false }));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, '/public/index.html'));
  });
}

function analyze(library, analysisId, libraryRepository, store) {
  store.dispatch(analysisStarted(analysisId));
  analyzeLibrary(library)
    .then(result => libraryRepository.save(library.name, library.version, result))
    .then(() => store.dispatch(analysisSucceeded(analysisId)))
    .catch(() => store.dispatch(analysisFailed(analysisId)));
}

module.exports = routing;
