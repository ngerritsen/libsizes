const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rootPath = path.join(__dirname, '..');

function routing(app, libraryRepository, analysisService) {
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(rootPath, 'public')));

  app.get('/api/libraries', (req, res) => {
    libraryRepository.getAll()
      .then(result => res.json(result));
  });

  app.post('/api/analyses/:id', (req, res) => {
    const { params, body } = req;
    analysisService.startAnalysis(params.id, body.libraryString)
      .then(() => res.json({ success: true }))
      .catch(error => res.json({ success: false, error: error.message }));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, '/public/index.html'));
  });
}

module.exports = routing;
