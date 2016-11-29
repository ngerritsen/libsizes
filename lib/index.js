const express = require('express');
const app = express();
const path = require('path');

const rootPath = path.join(__dirname, '..');
const port = process.env.PORT || 8022;

app.use('/public', express.static(path.join(rootPath, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, '/public/index.html'));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
