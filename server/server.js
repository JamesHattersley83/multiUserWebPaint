require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Working!!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
