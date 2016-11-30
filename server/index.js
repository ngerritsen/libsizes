const express = require('express');
const app = express();
const path = require('path');
const libraries = require('./libraries.json');

const rootPath = path.join(__dirname, '..');
const port = process.env.PORT || 8022;

app.use('/public', express.static(path.join(rootPath, 'public')));

app.get('/api/libraries', (req, res) => {
  res.json(libraries);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, '/public/index.html'));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
