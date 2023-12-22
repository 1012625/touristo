const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('../database/trdata.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS green (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat FLOAT,
        lng FLOAT,
        reason TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS red (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat FLOAT,
        lng FLOAT,
        reason TEXT
      )
    `);
    console.log('Connected to the database');
  }
});

app.post('/submit', (req, res) => {
  const {markerType, reason} = req.body; // Add markerType here

  //const table = color === 'red' ? 'red' : 'green';

  //const { lat, lng } = latLng;
  db.run(`INSERT INTO red (type, reason) VALUES (?, ?)`, [markerType, reason], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      //res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      //res.send('Data inserted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
