const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, '..', 'data.json');

// Read data from the JSON file
function readData() {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

// Write data to the JSON file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/items', (req, res) => {
  const data = readData();
  const newItem = { id: data.length + 1, name: req.body.name };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const data = readData();
  const itemId = parseInt(req.params.id);
  const updatedItem = data.find(item => item.id === itemId);
  if (!updatedItem) {
    return res.status(404).send('Item not found');
  }
  updatedItem.name = req.body.name;
  writeData(data);
  res.json(updatedItem);
});

app.delete('/api/items/:id', (req, res) => {
  const data = readData();
  const itemId = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === itemId);
  if (index === -1) {
    return res.status(404).send('Item not found');
  }
  data.splice(index, 1);
  writeData(data);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
