const express = require('express');
const path = require('path');
const analyzeLibrary = require('./analyzer');

const rootPath = path.join(__dirname, '..');
const FAKE_VERSION = 'FAKE_VERSION';

function routing(app, libraryRepository) {
  app.use('/public', express.static(path.join(rootPath, 'public')));

  app.get('/api/libraries', (req, res) => {
    libraryRepository.getAll()
      .then(result => res.json(result));
  });

  app.get('/api/libraries/:library', (req, res) => {
    libraryRepository.get(req.params.library, FAKE_VERSION)
      .then(result => {
        if (!result) {
          res.status(404);
        }

        res.json(result || null);
      });
  });

  app.post('/api/analysis/:library', (req, res) => {
    analyzeLibrary(req.params.library)
      .then(result => libraryRepository.save(req.params.library, FAKE_VERSION, result));

    res.json({ success: true });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, '/public/index.html'));
  });
}

module.exports = routing;
