const express = require('express');
const path = require('path');

const rootPath = path.join(__dirname, '..');

function routing(app, libraryRepository) {
  app.use('/public', express.static(path.join(rootPath, 'public')));

  app.get('/api/libraries', (req, res) => {
    libraryRepository.getAll()
      .then(result => res.json(result));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, '/public/index.html'));
  });
}

module.exports = routing;
