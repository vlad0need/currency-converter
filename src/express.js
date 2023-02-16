const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  // Set the CORS headers for all responses
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/exchange-rates', async (req, res) => {
  try {
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.listen(3001, () => console.log('Proxy server listening on port 3001'));
